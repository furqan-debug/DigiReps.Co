const { Resend } = require("resend");
const jwt = require("jsonwebtoken");
const { getEmailHtml } = require("./getEmailTemplate");
const { replacePlaceholders } = require("./replacePlaceholders");

const {
  RESEND_API_KEY,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  BACKEND_URL,
  FRONTEND_URL,
  EMAIL_FROM_NAME,
  EMAIL_FROM_ADDRESS,
} = process.env;

const resend = new Resend(RESEND_API_KEY);

async function sendVerificationEmail({ email, id }) {
  const token = jwt.sign({ sub: id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN || "24h",
  });

  const verifyUrl = `${BACKEND_URL}/api/auth/verify-email?token=${token}`;
  const rawHtml = await getEmailHtml("verifyEmail");
  
  // console.log("verifyUrl", verifyUrl);
  
  const html = replacePlaceholders(rawHtml, {
    verifyUrl,
  });
  // console.log("Raw HTML from Contentful:\n", rawHtml);
  // console.log("Verify URL:", verifyUrl);
  // console.log("HTML after replacement:\n", html);

  await resend.emails.send({
    from: `${EMAIL_FROM_NAME} <${EMAIL_FROM_ADDRESS}>`,
    to: email,
    subject: "Please verify your email address",
    html,
  });
}

async function sendResetPasswordEmail({ email, code }) {
  const rawHtml = await getEmailHtml("resetPassword");
  const html = replacePlaceholders(rawHtml, { code });

  await resend.emails.send({
    from: `${EMAIL_FROM_NAME} <${EMAIL_FROM_ADDRESS}>`,
    to: email,
    subject: "Your Password Reset Code",
    html,
  });
}

async function sendWelcomeEmail({ email, name }) {
  const rawHtml = await getEmailHtml("welcomeEmail");
  // console.log("Fetched HTML from Contentful:", rawHtml);

  const html = replacePlaceholders(rawHtml, {
    name,
    profileLink: `${FRONTEND_URL}/profile`,
  });

  await resend.emails.send({
    from: `${EMAIL_FROM_NAME} <${EMAIL_FROM_ADDRESS}>`,
    to: email,
    subject: "Let’s Get Started! Please complete your DigiReps application.",
    html,
  });
}

module.exports = {
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
};
