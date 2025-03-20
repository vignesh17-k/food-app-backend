const expressAsyncHandler = require("express-async-handler");
const supabase = require("../config/supabase");

const validateRoutes = expressAsyncHandler(async (req, res, next) => {
  try {
    const auth = req?.headers?.authorization || req?.headers?.Authorization;
    if (!auth || !auth.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token is missing" });
    }

    const token = auth.split(" ")[1];
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = data.user;
    console.log("✅ User authenticated:", req?.user);

    next();
  } catch (err) {
    console.log("error", err);
    return res.status(401).json({ message: "Unauthorized", err });
  }
});

module.exports = validateRoutes;
