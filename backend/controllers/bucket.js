const { BlobServiceClient, generateBlobSASQueryParameters, BlobSASPermissions } = require("@azure/storage-blob");
require("dotenv").config();

// Azure Blob Storage setup
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw new Error("Azure Storage connection string is not set in environment variables.");
}

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

exports.uploadImage = async (req, res)=>{
    try {
        if (!req) {
          return console.log("No file uploaded.")
        }
    
        const containerName = "blob"; // Replace with your Azure Blob container name
        const containerClient = blobServiceClient.getContainerClient(containerName);
    
        // Ensure the container exists
        const exists = await containerClient.exists();
        if (!exists) {
          await containerClient.create();
        }
    
        const blobName = Date.now() + '-' + req.originalname;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    
        // Upload the file buffer to Azure Blob Storage
        await blockBlobClient.upload(req.buffer, req.size);
    
        // const parts = blockBlobClient.url.split(".blob.core.windows.net"); // Split at the Azure domain

        const blobClient = containerClient.getBlobClient(blobName);
        
        
            // Generate a SAS URL
            const sasToken = generateBlobSASQueryParameters(
              {
                containerName,
                blobName,
                permissions: BlobSASPermissions.parse("r"), // Read-only permissions
                startsOn: new Date(),
                expiresOn: new Date("2100-01-01T00:00:00Z"), // 1 hour expiry
              },
              blobServiceClient.credential
            ).toString();
        
            const sasUrl = `${blobClient.url}?${sasToken}`;
        return sasUrl; // The path is the second part
    } catch (error) {
        console.error("Error uploading file:", error);
        return error
    }
};
