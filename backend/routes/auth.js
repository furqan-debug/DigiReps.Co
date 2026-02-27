const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const requireAuth = require("../middleware/auth");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { JWT_SECRET, JWT_EXPIRES_IN, BACKEND_URL, FRONTEND_URL } = process.env;
const {
  sendVerificationEmail,
  sendResetPasswordEmail,
  sendWelcomeEmail,
} = require("../utils/email");
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const router = express.Router();

function sendToken(user, res) {
  const payload = { sub: user._id, email: user.email };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return res.status(user.isNew ? 201 : 200).json({
    token,
    user: {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      country: user.country,
    },
  });
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${BACKEND_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.findOne({ email });
          if (user) {
            // link existing
            user.googleId = profile.id;
            user.googleAccessToken = accessToken;
            user.googleRefreshToken = refreshToken;
            user.emailVerified = true;
            await user.save();
          }
        }

        let isBrandNew = false;
        if (!user) {
          user = await User.create({
            fullname: profile.displayName,
            email,
            googleId: profile.id,
            googleAccessToken: accessToken,
            googleRefreshToken: refreshToken,
            profileImage: profile.photos[0].value,
            emailVerified: true,
          });
          isBrandNew = true;
        }

        // send welcome only for brand-new Google signups
        if (isBrandNew) {
          sendWelcomeEmail({ email: user.email, name: user.fullname }).catch(
            (err) => console.error("Welcome email error:", err)
          );
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/portal",
  }),
  (req, res) => {
    const payload = { sub: req.user._id, email: req.user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const redirectTo = `${FRONTEND_URL}/auth/callback#authToken=${token}`;
    res.redirect(redirectTo);
  }
);

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required." });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "Email not found." });

  // generate code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  user.resetPasswordCode = code;
  user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
  await user.save();

  // send email with code
  await sendResetPasswordEmail({ email: user.email, code });
  res.json({ message: "Verification code sent to email." });
});

router.post("/verify-reset-code", async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code)
    return res.status(400).json({ message: "Email and code required." });

  const user = await User.findOne({ email, resetPasswordCode: code });
  if (!user) return res.status(400).json({ message: "Invalid code." });
  if (Date.now() > user.resetPasswordExpires) {
    return res.status(400).json({ message: "Code expired." });
  }

  res.json({ message: "Code verified." });
});

router.post("/reset-password", async (req, res) => {
  const { email, code, newPassword, confirmPassword } = req.body;
  if (!email || !code || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  const user = await User.findOne({ email, resetPasswordCode: code });
  if (!user) return res.status(400).json({ message: "Invalid code or email." });
  if (Date.now() > user.resetPasswordExpires) {
    return res.status(400).json({ message: "Code expired." });
  }

  // hash and save new password
  const hashed = await bcrypt.hash(newPassword, 12);
  user.password = hashed;
  user.resetPasswordCode = null;
  user.resetPasswordExpires = null;
  await user.save();

  res.json({ message: "Password reset successful." });
});

router.post("/signup", async (req, res) => {
  try {
    const { fullname, email, phone, country, password, confirmPassword } =
      req.body;
    if (
      !fullname ||
      !email ||
      !phone ||
      !country ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (await User.findOne({ email })) {
      return res.status(409).json({ message: "Email already in use." });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }
    if (await User.findOne({ phone })) {
      return res.status(409).json({ message: "Phone number already in use." });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({
      fullname,
      email,
      phone,
      country,
      password: hashed,
    });

    // send verification link
    sendVerificationEmail({ email: user.email, id: user._id }).catch((err) =>
      console.error("Email sending failed:", err)
    );

    return res.status(201).json({
      message:
        "Registration successful. Please check your email to verify your account.",
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Server error." });
  }
});

router.get("/verify-email", async (req, res) => {
  const { token } = req.query;
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(404).json({ message: "User not found." });
    if (!user.emailVerified) {
      user.emailVerified = true;
      await user.save();

      // fire & forget welcome email
      sendWelcomeEmail({ email: user.email, name: user.fullname }).catch(
        (err) => console.error("Welcome email error:", err)
      );
    }

    // now preserve the token for the front-end
    return res.redirect(`${FRONTEND_URL}/verified?token=${token}`);
  } catch (err) {
    console.error("Email verify error:", err);
    return res.status(400).json({ message: "Invalid or expired token." });
  }
});

router.post("/resend-verification", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (user.emailVerified) {
      return res.status(400).json({ message: "Email already verified." });
    }
    await sendVerificationEmail({ email: user.email, id: user._id });
    return res.json({ message: "Verification email resent." });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(500).json({ message: "Server error." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email or password incorrect." });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Email or password incorrect." });
    }
    if (!user.emailVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in.",
        resendEndpoint: "/api/auth/resend-verification",
      });
    }
    return sendToken(user, res, Boolean(rememberMe));
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error." });
  }
});

router.put("/profile", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id; // make sure your auth middleware sets sub

    // 1) Check that every field is provided
    const requiredFields = [
      "fullname",
      "role",
      "yearsOfExp",
      "address",
      "bio",
      "profileImage",
      "videoUrl",
      "skills",
      "languages",
      "experiences",
      "educations",
    ];
    const missing = requiredFields.filter((f) => req.body[f] === undefined);
    if (missing.length) {
      return res
        .status(400)
        .json({ message: "Missing required fields: " + missing.join(", ") });
    }

    // 2) Whitelist & build update object
    const updates = {};
    for (let field of requiredFields) {
      updates[field] = req.body[field];
    }

    // 3) Apply update
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // 4) Return updated profile
    res.json({ user });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

router.get("/profile", requireAuth, async (req, res) => {
  try {
    // grab the user ID from the middleware (adjust if you use .sub vs .id)
    const userId = req.user.id;

    // find the user and strip out the password field
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // send back the profile
    res.json({ user });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error." });
  }
});
router.get("/test-email", async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res
        .status(400)
        .json({ success: false, message: "Missing email or name" });
    }

    await sendWelcomeEmail({ email, name });

    res
      .status(200)
      .json({ success: true, message: "Welcome email sent successfully" });
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to send welcome email",
        error: error.message,
      });
  }
});

module.exports = router;
