const generateUniqueImageName = require('./generateUniqueName');
const fs = require('fs');
const path = require('path');

export const saveImage = (imageBuffer, originalFileName)=> {
  const fileName = generateUniqueImageName(originalFileName);
  const filePath = path.join(__dirname, 'uploads', fileName);

  fs.writeFileSync(filePath, imageBuffer);
  return filePath; // Return the path where the image is stored
}