const multer = require("multer");
const fs = require("fs");

const Res = require("../Controllers/DefaultResponseController");
const CONSATNTS = require("../../app_config/constants");

class FileProvider {
  saveMultipleImage(req, res, { param, limit = 9, path }, callbackFunc) {
    try {
      const storage = multer.diskStorage({
        destination: function(req, file, cb) {
          const savePath = CONSATNTS.defaultImgPath + path;
          if (!fs.existsSync(savePath)) {
            fs.mkdirSync(savePath);
          }
          cb(null, savePath);
        },
        filename: function(req, file, cb) {
          cb(null, file.originalname);
        }
      });
      const upload = multer({ storage: storage });
      upload.array(param, limit)(req, res, err => {
        let response = Res.success({});
        if (err) {
          response = Res.error({ msg: err.message });
        } else {
          if (req.files.length < 1 || req.files == null) {
            response = Res.badRequest({ msg: "Image can not be null and should files" });
          } else {
            const isFileType = this.fileTypeChecker(req.files);
            if (isFileType.code !== 200) {
              response = Res.badRequest({ msg: isFileType });
            } else {
              response = Res.success({ msg: isFileType });
            }
          }
        }
        callbackFunc(req, response);
      });
    } catch (error) {
      console.log(error.message);
      return Res.error({ msg: error.message });
    }
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
