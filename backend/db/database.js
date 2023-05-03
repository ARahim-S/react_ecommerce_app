const mongoose = require("mongoose");
const chalk = require("chalk");

const connectDb = async () => {
  try {
    const data = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `DB connected successfully with the server: ${chalk.red(
        data.connection.host
      )}!`
    );
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDb;
//1:33de kaldım
