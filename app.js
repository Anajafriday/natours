const path = require("path");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitizer = require("express-mongo-sanitize");
const xssSanitizer = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const compression = require("compression")
const cors = require("cors")
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/erroController");
const app = express();
// Pug setup
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// global middleware
app.use(cors())
// allow access origin to * all
// if our frtend is on natours.com and backend is on api.natours.dev
// app.use(cors({ origin: "natours.com" })) set the access to only our frontend
app.options("*", cors())
// Middleware for security headers
// app.enable("trust proxy")
const scriptSrcUrls = ["https://unpkg.com/", "https://tile.openstreetmap.org"];
const styleSrcUrls = [
  "https://unpkg.com/",
  "https://tile.openstreetmap.org",
  "https://fonts.googleapis.com/",
];
const connectSrcUrls = ["https://unpkg.com", "https://tile.openstreetmap.org"];
const fontSrcUrls = ["fonts.googleapis.com", "fonts.gstatic.com"];

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: [
        "'self'",
        'https://natours-by-friday.onrender.com',
        'https://checkout.stripe.com',
        'https://billing.stripe.com/session',
        ...connectSrcUrls
      ],
      scriptSrc: ["'self'", ...scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", "blob:"],
      objectSrc: [],
      imgSrc: ["'self'", "blob:", "data:", "https:"],
      fontSrc: ["'self'", ...fontSrcUrls],
    },
  })
);

// Additional middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit request rate
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, try again in an hour.",
});
app.use("/api", limiter);
const bookingController = require("./controllers/bookingController");

app.post("/webhook-checkout", express.raw({ type: "application/json" }), bookingController.createCheckoutWebhook)
// body parser
// Middleware for cookies
app.use(cookieParser());
app.use(compression())
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(mongoSanitizer());
app.use(xssSanitizer());

// Prevent parameter pollution
const whitelistParams = [
  "ratingsAverage",
  "ratingsQuantity",
  "duration",
  "difficulty",
  "maxGroupSize",
  "price",
];
app.use(
  hpp({
    whitelist: whitelistParams,
  })
);

// Routes
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const viewRouter = require("./routes/viewRoutes");
const bookingRouter = require("./routes/bookingRoutes");
// SSR Routes for Pug templates
app.use("/", viewRouter);

// API routes
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/bookings", bookingRouter);

// Handle undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`The page ${req.originalUrl} cannot be found`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
