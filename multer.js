const multer = require("multer");
const Datauri = require('datauri');
const path = require('path');
// console.log(path)

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).array("image");
const dUri = new Datauri();
/**

@description This function converts the buffer to data url
@param {Object} req containing the field object
@returns {String} The data url from the string buffer
*/

const dataUri = (file) => 
    dUri.format(path.extname(file.name).toString(), file.data);


module.exports.multerUploads = multerUploads;
module.exports.dataUri = dataUri;
