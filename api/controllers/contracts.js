const mongoose = require("mongoose");
const Contract = require("../models/contract");

exports.contracts_get_user_all = (req, res, next) => {
  Contract.find( { userId: req.params.userId } )
    .select("_id address initHash ownerAddress type title data status")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        contracts: docs.map(doc => {
          return {
            address: doc.address,
            initHash: doc.initHash,
            ownerAddress: doc.ownerAddress,
            type: doc.type,
            title: doc.title,
            data: doc.data,
            status: doc.status,
            _id: doc._id,
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.contracts_create_contract = (req, res, next) => {
  const userId = req.params.userId;
  const contract = new Contract({
    _id: new mongoose.Types.ObjectId(),
    userId: userId,
    data: req.body.data,
    type: req.body.type,
    status: req.body.status,
    title: req.body.title
  });
  contract
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created contract successfully",
        createdContract: {
          userId: result.userId,
          data: result.data,
          type: result.type,
          status: result.status,
          title: result.title,
          _id: result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.contracts_update_contract = (req, res, next) => {
  const id = req.params.contractId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Contract.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Contract updated"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};