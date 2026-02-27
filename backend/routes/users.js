const express = require("express");
const User = require("../models/user");
const router = express.Router();
const getAdminCredentials = require("../utils/getAdminCredentials");

const ADMIN_USER = process.env.ADMIN_USER;

async function basicAuth(req, res, next) {
  const auth = req.headers.authorization || "";
  const [scheme, payload] = auth.split(" ");

  if (scheme !== "Basic" || !payload) {
    res.setHeader("WWW-Authenticate", 'Basic realm="User Admin"');
    return res.status(401).send("Authentication required.");
  }

  const [user, pass] = Buffer.from(payload, "base64").toString().split(":");

  try {
    const { password: contentfulPassword } = await getAdminCredentials();

    if (user === ADMIN_USER && pass === contentfulPassword) {
      return next();
    }

    res.setHeader("WWW-Authenticate", 'Basic realm="User Admin"');
    return res.status(401).send("Authentication required.");
  } catch (err) {
    console.error("Failed to fetch credentials from Contentful:", err.message);
    return res.status(500).send("Server error.");
  }
}

router.get("/users", basicAuth, async (req, res) => {
  const users = await User.find().select("fullname email role isPublic");
  res.json(users);
});

router.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }
  if (!user.isPublic) {
    return res.status(403).json({ message: "This profile is private." });
  }
  res.json(user);
});

router.put("/users/:id/visibility", basicAuth, async (req, res) => {
  const { isPublic } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isPublic },
    { new: true }
  ).select("fullname isPublic");
  if (!user) return res.status(404).json({ message: "User not found." });
  res.json(user);
});

router.delete("/users/:id", basicAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({ message: "User deleted successfully.", user });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Server error." });
  }
});


module.exports = router;
