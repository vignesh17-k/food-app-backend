const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateRoutes = expressAsyncHandler(async (req, res, next) => {
  let token;
  const auth = req?.headers?.Authorization || req?.headers?.authorization;
  if (auth && auth.startsWith("Bearer")) {
    token = auth?.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
      if (err) {
        return res?.status(401)?.json({
          message: "User is not Authorized",
        });
      }
      console.log(decoded);
      req.user = decoded?.user;
      next();
    });
  }

  if (!token) {
    return res?.status(401)?.json({
      message: "User is not Authorized token is missing",
    });
  }
});

module.exports = validateRoutes;
