const multer = require("multer");
const fs = require("fs");

const Res = require("../Controllers/DefaultResponseController");
const CONSATNTS = require("../../app_config/constants");

class FileProvider {
  saveMultipleImage({ path }) {
    const storage = multer.diskStorage({
      destination: function(req, file, cb) {
        const savePath = path;
        if (!fs.existsSync(savePath)) {
          fs.mkdirSync(savePath);
        }
        req.fileSavePAth = savePath;
        cb(null, savePath);
      },
      filename: function(req, file, cb) {
        cb(null, file.originalname);
      }
    });

    return multer({ storage: storage });
  }

  fileTypeChecker(imageList) {
    for (var i = 0; i < imageList.length; i++) {
      if (CONSATNTS.imageTypeAccept.indexOf(imageList[i].mimetype) == -1) {
        return Res.badRequest({ msg: "Can not read this image type" });
      }
    }
    return Res.success({});
  }
}

module.exports = new FileProvider();
