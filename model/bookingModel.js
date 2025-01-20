const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  tour: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
      required: [true, "Booking must belong to a tour!"],
    },
  ],
  user: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Booking must belong to a user!"],
    },
  ],
  price: {
    type: Number,
    required: [true, "Booking must have a price!"],
  },
  paid: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// POPULATE
bookingSchema.pre(/^find/, function (next) {
  this.populate("User").populate({
    path: "Tour",
    select: "name",
  });
  next();
});

module.exports = mongoose.model("Booking", bookingSchema);
