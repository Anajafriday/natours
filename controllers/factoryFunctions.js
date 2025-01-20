const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsyncError = require("../utils/catchAsyncError");

exports.deleteOne = (Model) =>
  catchAsyncError(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(
        new AppError("invalid document ID: no document can be find ", 404)
      );
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsyncError(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(
        new AppError(`invalid document ID: no document can be find `, 404)
      );
    }
    res.status(200).json({
      status: "success",
      data: {
        updatedData: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsyncError(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newData: doc,
      },
    });
  });
exports.getOne = (Model, populateOptions) =>
  catchAsyncError(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;
    if (!doc) {
      return next(
        new AppError("invalid document ID: no document can be find ", 404)
      );
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsyncError(async (req, res, next) => {
    let filter = {};
    // small hack to allow nested review with tour route
    if (req.params.tourId) filter = { tour: req.params.tourId };
    const feature = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .fieldLimit()
      .paginate();
    // const doc = await feature.query.explain(); explain index
    const doc = await feature.query;
    //SEND RESPONSE
    res.status(200).json({
      status: "success",
      result: doc.length,
      data: {
        data: doc,
      },
    });
  });
