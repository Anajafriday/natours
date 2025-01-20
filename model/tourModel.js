const mongoose = require("mongoose");
const slugify = require("slugify");
const { isAlpha } = require("validator");
// const User = require("./userModel");
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      validate: {
        validator: function (val) {
          return isAlpha(val);
        },
        message: "a tour name must not contain a number",
      },
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "A tour must have a duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a groupsize"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "difficulty can either be : easy,medium or difficult",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "average ratings must be above 1.0"],
      max: [5, "average ratings must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10, //trick
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "A tour must have a description"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have a cover image"],
    },
    images: [String],
    startDates: [Date],
    startLocation: {
      // geoJSON
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      description: String,
      address: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"],
        },
        coordinates: [Number],
        description: String,
        day: Number,
      },
    ],
    //EMBEDDING guides: [String],
    guides: [
      // REFERENCING
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
    secreteTour: {
      type: Boolean,
      default: false,
    },

    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only works on .creat()
          return val < this.price;
        },
        message: "discount price ({VALUE}) must be less than the regular price",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      Select: false,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
// indexing
tourSchema.index({ price: 1, ratingsAverage: -1 }); //compound index
tourSchema.index({ slug: 1 });
// geo indexing
tourSchema.index({ startLocation: "2dsphere" });

tourSchema.virtual("durationwWeeks").get(function () {
  return this.duration / 7;
});
// VIRTUAL POPULATING
tourSchema.virtual("reviews", {
  ref: "Review", // name of the model for referencing
  foreignField: "tour", //name given to this tour in review model
  localField: "_id", // the current model info that connect with the ref model
});
// DOCUMENT MIDDLEWARE only works on .save() .creat()
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
// EMBEDDING
// tourSchema.pre("save", async function (next) {
//   const guidesProm = this.guides.map(async (id) => await User.findById(id));
//   this.guides = await Promise.all(guidesProm);
//   next();
// });
// QUERY MIDDLEWARE
tourSchema.pre(/^find/, function (next) {
  this.find({ secreteTour: { $ne: true } });
  next();
});
tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: "guides",
    select: "-__v -passwordUpdatedAt",
  });
  next();
});

// AGGREGATE MIDDLEWARE
// tourSchema.pre("aggregate", function (next) {
//   this.pipeline().unshift({ $match: { secreteTour: { $ne: true } } });

//   next();
// });
module.exports = mongoose.model("Tour", tourSchema);
