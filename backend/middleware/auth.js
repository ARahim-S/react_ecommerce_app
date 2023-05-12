const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../model/userModel");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const { id } = decoded;
  const user = await User.findById(id);

  req.user = user;
  next();
});
