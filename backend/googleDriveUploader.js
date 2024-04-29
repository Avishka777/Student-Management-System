// googleDriveUploader.js

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '905097017077-g84ji1m973hc0l0m95ddo8itgjfmb7se.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04Xu9bKdv3soQCgYIARAAGAQSNwF-L9IriewvbKg1tvDJ7wzUKykLLW0NZmgl87zOriTe2dP6xckHUG9RkSK6GVSvuoLjilC4XXg';

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
        const response = await drive.files.create({
            requestBody: {
                name: fileName,
                mimeType: 'image/png' // Change mimeType if needed
            },
            media: {
                mimeType: 'image/png', // Change mimeType if needed
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
