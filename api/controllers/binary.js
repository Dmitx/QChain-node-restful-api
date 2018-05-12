const mongoose = require("mongoose");
const Binary = require("../models/binary");

exports.binary_get_type = (req, res, next) => {
    Binary.findOne( { type: req.params.binaryType } )
    .select("type title binary")
    .exec()
    .then(binary => {
      if (!binary) {
        return res.status(404).json({
          message: "Binary not found"
        });
      }
      res.status(200).json({
        type: binary.type,
        title: binary.title,
        binary: binary.binary
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.binary_create = (req, res, next) => {
  Binary.find({ type: req.body.type })
    .exec()
    .then(binaryExists => {
      if (binaryExists.length >= 1) {
        return res.status(409).json({
          message: "Binary type exists"
        });
      } else {
        const binary = new Binary({
          _id: new mongoose.Types.ObjectId(),
          type: req.body.type,
          title: req.body.title,
          binary: req.body.binary,
        });
        binary
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message: "Created binary successfully",
              createdBinary: {
                type: result.type,
                title: result.title,
                binary: result.binary
            }
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
      }
  });
};

exports.binary_update_type = (req, res, next) => {
  const type = req.params.binaryType;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  if ("type" in updateOps) {
    return res.status(409).json({
      message: "Binary type is immutable"
    });
  }
  Binary.update({ type: type }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Binary updated"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};