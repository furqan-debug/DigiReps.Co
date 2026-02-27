const mongoose = require("mongoose");

const WorkExpSchema = new mongoose.Schema(
  {
    companyName: { type: String, trim: true, default: "" },
    startMonth: { type: String, trim: true, default: "" },
    startYear: { type: String, trim: true, default: "" },
    endMonth: { type: String, trim: true, default: "" },
    endYear: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const EducationSchema = new mongoose.Schema(
  {
    school: { type: String, trim: true, default: "" },
    degree: { type: String, trim: true, default: "" },
    fieldOfStudy: { type: String, trim: true, default: "" },
    startMonth: { type: String, trim: true, default: "" },
    startYear: { type: String, trim: true, default: "" },
    endMonth: { type: String, trim: true, default: "" },
    endYear: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: Number,
    required: function () {
      return !this.googleId;
    },
    trim: true,
    default: null,
  },
  country: {
    type: String,
    required: function () {
      return !this.googleId;
    },
    trim: true,
    default: null,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  googleAccessToken: {
    type: String,
    default: null,
  },
  googleRefreshToken: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    trim: true,
    default: "",
  },
  yearsOfExp: {
    type: String,
    trim: true,
    default: "",
  },
  address: {
    type: String,
    trim: true,
    default: "",
  },
  bio: {
    type: String,
    trim: true,
    default: "",
  },
  profileImage: {
    type: String,
    trim: true,
    default: "",
  },
  videoUrl: {
    type: String,
    trim: true,
    default: "",
  },
  skills: {
    type: [String],
    default: [],
  },
  languages: {
    type: [String],
    default: [],
  },
  experiences: {
    type: [WorkExpSchema],
    default: [],
  },
  educations: {
    type: [EducationSchema],
    default: [],
  },

  resetPasswordCode: { type: String, default: null },
  resetPasswordExpires: { type: Date, default: null },
  isPublic: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
