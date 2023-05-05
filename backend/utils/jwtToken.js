// create token and saving that in cookies
const sendToken = (user, code, res) => {
  const token = user.getJwtToken();
  console.log(token);
  // Options for cookies
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    //sameSite: "none",
    //secure: true,
  };

  res.cookie("token", token, cookieOptions);

  res.status(code).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
