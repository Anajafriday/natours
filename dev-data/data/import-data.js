const { configDotenv } = require("dotenv");
const fs = require("fs");
const mongoose = require("mongoose");
configDotenv({ path: "./config.env" });
const Tour = require("./../../model/tourModel");
const User = require("./../../model/userModel");
const Review = require("./../../model/reviewModel");
const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("databse successfuly connected"));

//   READING
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, "utf-8"));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
);

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log("imported sucessfully");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log("deleted sucessfully");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};
if (process.argv[2] === "--import") importData();
else if (process.argv[2] === "--delete") deleteData();
console.log(process.argv);

/**
 * // const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, "utf-8")
// );
// exports.checkID = (req, res, next, val) => {
//   const id = req.params.id * 1;
//   if (id > tours.length)
//     return res.status(404).json({ status: "fail", message: "invalid  ID" });
//   next();
// };
     // BUILDING QUERY
    // const queryObj = { ...req.query };
    // const excludedQuery = ["page", "fields", "limit", "sort"];
    // // Filter
    // excludedQuery.forEach((el) => delete queryObj[el]);
    // // ADVANCE Filter
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    // // USING
    // let query = Tour.find(JSON.parse(queryStr));
    // //SORT
    // if (req.query.sort) {
    //   const sort = req.query.sort.split(",").join(" ");
    //   query = query.sort(sort);
    // } else {
    //   query = query.sort("-createdAt");
    // }
    // // Field Limit
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(",").join(" ");
    //   query = query.select(fields);
    // } else {
    //   query = query.select("-__v");
    // }
    // // PAGINATION
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;

    // const skip = (page - 1) * limit;
    // query = query.skip(skip).limit(limit);
    // if (req.query.page) {
    //   const numTour = await Tour.countDocuments();
    //   if (skip >= numTour) throw new Error("this page doesn't exist");
    // }
 */
