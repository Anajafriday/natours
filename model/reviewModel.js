const mongoose = require("mongoose");
const Tour = require("./tourModel");
const reviewSchema = new mongoose.Schema(
  {
    review: { type: String, required: [true, "review can not be emptys!"] },
    rating: { type: Number, min: 1, max: 5 },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
      required: [true, "review must belong to a tour"],
    },
    reviewer: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "review must belong to a user"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
// index to prevent duplicate reviews
reviewSchema.index({ tour: 1, reviewer: 1 }, { unique: true });
//
reviewSchema.pre(/^find/, function (next) {
  // this.populate({ path: "tour", select: "name" }).populate({
  //   path: "reviewer",
  //   select: "name photo",
  // });
  this.populate({
    path: "reviewer",
    select: "name photo",
  });
  next();
});
// static method
reviewSchema.statics.calcAvgRating = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: "$tour",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  // make sure the stats is no empty if so default to 4.5 and 0 else uodate
  if (stats.length > 0)
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: stats[0].avgRating,
      ratingsQuantity: stats[0].nRating,
    });
  else
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: 4.5,
      ratingsQuantity: 0,
    });
};

reviewSchema.post("save", function () {
  // call the method from the construcor and get the tourId from the current doc NOTE: this point to the current doc
  this.constructor.calcAvgRating(this.tour);
});
// this work  on any query that start with findOneAnd
reviewSchema.pre(/^findOneAnd/, async function (next) {
  // save the review on as a new property on "this" so it will be availaible for the next middleware
  this.rev = await this.findOne();
  next();
});
reviewSchema.post(/^findOneAnd/, async function () {
  if (this.rev)
    // get the tour id from the before middleware
    await this.rev.constructor.calcAvgRating(this.rev.tour); // call the constructor which is available on the rev
});
module.exports = mongoose.model("Review", reviewSchema);
