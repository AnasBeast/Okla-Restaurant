const User = require("../models/admin");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

exports.createUser = async (req, res , next)=>{
    try {
        // Get user input
        const { email, password } = req.body;
        // Validate user input
        if (!(email && password )) {
          res.status(400).send("All input is required");
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
    
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create token
        const token = jwt.sign(
          { encryptedPassword, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // Create user in our database
        const user = await User.create({
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
          token : token
        });
    
       
        // save user token
        user.token = token;
    
        // return new user
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }
}

exports.loginUser = async (req , res , next)=>{
    // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;
      await User.updateOne({_id: user._id}, user)

      // user
      res.status(200).json(user);
    }else{
      res.status(401).send("Invalid Credentials");
    }
    console.log(user)
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
}

exports.checkUser = async (req , res , next)=>{
  // Our login logic starts here
try {
  // Get user input
  const token = req.body.token;

  // Validate user input
  jwt.verify(token, process.env.TOKEN_KEY, function(err, decoded) {
    if (err) {
      console.log(err)
      return res.status(403).json({
        message : "Token expired, please login again !"
      });/*
        err = {
          name: 'TokenExpiredError',
          message: 'jwt expired',
          expiredAt: 1408621000
        }
      */
    }
  });
} catch (err) {
  console.log(err);
}
}