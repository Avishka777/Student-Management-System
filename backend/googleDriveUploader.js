const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
require('dotenv').config();


const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
});

const uploadFileToDrive = async (filePath, fileName) => {
    try {
        const folderMetadata = {
            'name': fileName, // Use the original file name as the folder name
            'mimeType': 'application/vnd.google-apps.folder'
        };
        const folderResponse = await drive.files.create({
            resource: folderMetadata,
            fields: 'id'
        });
        const folderId = folderResponse.data.id;

        // Upload file into the created folder
        const response = await drive.files.create({
            requestBody: {
                name: fileName,
                parents: [folderId]
            },
            media: {
                mimeType: 'file/upload', 
                body: fs.createReadStream(filePath)
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error uploading file to Google Drive:', error.message);
        throw error;
    }
};



module.exports = { uploadFileToDrive };
