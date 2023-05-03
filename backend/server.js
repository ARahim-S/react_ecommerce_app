const app = require("./app");
const connectDb = require("./db/database");

//Handling Uncaught Exception
process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("Shutting down the server for handling uncaught exception");
});

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  const dot = require("dotenv");
  dot.config({ path: "./config/.env" });
}

//connect db
connectDb();

//create server
const server = app.listen(process.env.PORT, (err) => {
  if (err) console.log("Error in server setup");
  console.log(`Server is running on https://localhost:${process.env.PORT}`);
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log("Shutting down the server for unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
