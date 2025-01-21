const catchAsyncError = require("../utils/catchAsyncError");
const Tour = require("../model/tourModel");
const Booking = require("../model/bookingModel");
const User = require("../model/userModel");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const factory = require("./factoryFunctions");
const bookingModel = require("../model/bookingModel");
exports.getCheckout = catchAsyncError(async (req, res, next) => {
  // 1) find the current booked tour
  const tour = await Tour.findById(req.params.tourId);
  //2) build session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}/mybooking`,
    // success_url: `${req.protocol}://${req.get("host")}/mybooking?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`, // WARN::NOT secure
    cancel_url: `${req.protocol}://${req.get("host")}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: tour.price * 100, // price in cent or kobo,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [`https://natours.dev/img/tours/${tour.imageCover}`],
          },
        },

        quantity: 1,
      },
    ],
    mode: "payment",
  });
  //3) send checkout to client
  res.status(200).json({
    status: "success",
    session,
  });
});

// exports.createBookingCheckout = catchAsyncError(async (req, res, next) => {
//   const { tour, user, price } = req.query;
//   if (!tour && !user && !price) return next();
//   await Booking.create({ tour, user, price });
//   // redirect back to / without the query string
//   res.redirect(req.originalUrl.split("?")[0]);
// });

const createBookingCheckout = async (session) => {
  const tour = session.client_reference_id
  const user = (await User.findOne({ email: session.customer_email }))?.id
  const price = session.line_items[0].price_data.unit_amount / 100
  await Booking.create({ tour, user, price });
}
exports.createCheckoutWebhook = (req, res, next) => {
  const stripeSignature = req.headers["stripe-signature"]
  let event
  try {
    event = stripe.webhooks.constructEvent(req.body, stripeSignature, process.env.STRIPE_WEBHOOK_SECRETE)
  } catch (error) {
    res.status(400).send(`webhookError:${error.message}`)
  }
  if (event.type === "checkout.session.completed")
    createBookingCheckout(event.data.object)
  res.status(200).json({ received: true })
}

// admin
exports.getAllBookings = factory.getAll(Booking)
exports.getBooking = factory.getOne(Booking)
exports.createBooking = factory.createOne(Booking)
exports.updateBooking = factory.updateOne(Booking)
exports.deleteBooking = factory.deleteOne(Booking)