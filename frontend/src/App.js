import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Acceuil from './screens/Acceuil';
import Menu from './screens/Menu';
import AdminAjouterProduit from './screens/admin-ajout-produit';
import AdminDashboard from './screens/admin-dashboard';
import AdminModifierProduit from './screens/admin-modifier-produit';
import Adminlogin from './screens/adminlogin';
import Localisation from './screens/Localisation';
import Contact from './screens/Contact';
import AdminAjouterBlog from './screens/admin-ajout-blog';
import AdminBlogs from './screens/admin-blogs';
import AdminProducts from './screens/admin-products';
import AdminModifierBlog from './screens/admin-modifier-blog';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Acceuil/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/localisation" element={<Localisation/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
      <Routes>
        <Route path="/login" element={<Adminlogin/>}/>
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/admin/ajouter-produit" element={<AdminAjouterProduit/>}/>
        <Route path="/admin/ajouter-blog" element={<AdminAjouterBlog/>}/>
        <Route path="/admin/blogs" element={<AdminBlogs/>}/>
        <Route path="/admin/produits" element={<AdminProducts/>}/>
        <Route path="/admin/modifier-product/:id" element={<AdminModifierProduit/>}/>
        <Route path="/admin/modifier-blog/:id" element={<AdminModifierBlog/>}/>
      </Routes>
    </Router>
      
    
  );
}

export default App;
