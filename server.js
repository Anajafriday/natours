const { configDotenv } = require("dotenv");
configDotenv({ path: "./config.env" });
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION💥:shutting down.... ");
  console.log(err.name, err.message);
  process.exit(1);
  // server.close(() => {
  // });
});
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION💥:shutting down.... ");
  console.log(err.name, err.message);
  process.exit(1);
  // server.close(() => {
  // });
});

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
app.listen(port, () => {
  console.log(`listening on port ${port}....`);
});
