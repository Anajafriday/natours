const { configDotenv } = require("dotenv");
configDotenv({ path: "./config.env" });


const app = require("./app");
const mongoose = require("mongoose");
const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database successfuly connected"))
  .catch((err) => {
    throw err;
  });

// LISTENING TO SERVER
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`listening on port ${port}....`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION💥:shutting down.... ");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION💥:shutting down.... ");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("😎 SIGTERM Received.")
  server.close(() => {
    console.log("💔 Process Terminated!")
  });
})