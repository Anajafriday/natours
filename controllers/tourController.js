const Tour = require("./../model/tourModel");
const catchAsyncError = require("../utils/catchAsyncError");
const factory = require("./factoryFunctions");
const AppError = require("../utils/appError");
const multer = require("multer");
const sharp = require("sharp");
const multerStorage = multer.memoryStorage(); // store the file as a buffer
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("only image is accepted.", 400), false);
  }
};
// file upload setup
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
// upload.single for single, (req.file)
// upload.array("images",maxcount) for many images of the same name (req.files)
// upload.fields([{name:"",maxCount:number}]) for file of different fild name mix (req.files)
exports.uploadTourImages = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

exports.resizeTourImages = catchAsyncError(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();

  // imageCover
  req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
  // resize
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/tours/${req.body.imageCover}`);
  //  tour images
  req.body.images = [];
  await Promise.all(
    // use map so it return an array then we can use promise.all to await the image processing
    req.files.images.map(async (file, i) => {
      // create file name for each file
      const fileName = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
      // resizing the image
      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/tours/${fileName}`);
      //update the images filed array
      req.body.images.push(fileName);
    })
  );
  //
  next();
});

exports.getTopCheapTour = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-price,ratingsAverage";
  req.query.fields = "name,price,difficulty,description";
  next();
};

//  ROUTE HANDLERS
exports.getAllTours = factory.getAll(Tour);
exports.getTour = factory.getOne(Tour, { path: "reviews" });
exports.creatTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);

// data aggregation
exports.getTourStaticstic = catchAsyncError(async (req, res, next) => {
  const stats = await Tour.aggregate([
    { $match: { ratingsAverage: { $gte: 4.5 } } },
    {
      $group: {
        _id: "$difficulty",
        numTours: { $sum: 1 },
        avgRatings: {
          $avg: "$ratingsAverage",
        },
        avgPrice: {
          $avg: "$price",
        },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    stats,
  });
});

exports.getMonthlyPlan = catchAsyncError(async (req, res, next) => {
  const year = req.params.year * 1;
  const monthlyPlan = await Tour.aggregate([
    { $unwind: "$startDates" },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$startDates" },
        numTourStart: { $sum: 1 },
        tours: { $push: "$name" },
      },
    },
    { $addFields: { month: "$_id" } },
    { $project: { _id: 0 } },
    { $sort: { numTourStart: -1 } },
  ]);
  res.status(200).json({
    status: "success",
    result: monthlyPlan.length,
    monthlyPlan,
  });
});

// geospatial query
// According to NASA, Earth's radius at the equator is 3,963 miles (6,378 kilometers)
exports.getToursWithin = catchAsyncError(async (req, res, next) => {
  // /tours-within/500/center/32.127411,-99.634835/unit/km
  const { distance, latlng, unit } = req.params;
  const radius = unit === "mi" ? distance / 3963 : distance / 6378;

  const [lat, lng] = latlng.split(",");

  if (!lat || !lng)
    return next(new AppError("please provide the center in form of lat,lng."));
  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });
  // before the above can work we need to index the startLocation to 2dsphere
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      data: tours,
    },
  });
});
exports.getToursDistance = catchAsyncError(async (req, res, next) => {
  // /tours-within/500/center/32.127411,-99.634835/unit/km
  const { latlng, unit } = req.params;
  const multiplier = unit === "mi" ? 0.000621371 : 0.001;

  const [lat, lng] = latlng.split(",");

  if (!lat || !lng)
    return next(new AppError("please provide the center in form of lat,lng."));
  const distance = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: "distance",
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);
  // before the above can work we need to index the startLocation to 2dsphere
  res.status(200).json({
    status: "success",
    results: distance.length,
    data: {
      data: distance,
    },
  });
});
