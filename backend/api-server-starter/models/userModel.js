const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: {
      type: String,
      required: true,
      match: /^\d{10,}$/ // Must be at least 10 digits
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"]
    },
    date_of_birth: { type: Date, required: true },
    address: {
          street: { type: String, required: true }, // Street address
          city: { type: String, required: true }, // City
          zipCode: { type: String, required: true } // Postal/ZIP code
      }
  },
  { timestamps: true, versionKey: false }
);



// static signup method
userSchema.statics.signup = async function (name, email, password, phone_number, gender, date_of_birth, address) {
  // validation
  if ((!name, !email || !password || !phone_number || !gender || !date_of_birth || !address)) {
    throw Error("Please add all fields");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  if (!validator.isMobilePhone(phone_number)) {
    throw Error("Invalid Phone number");
  }
  if (!validator.isDate(date_of_birth)) {
    throw Error("Invalid date of birth");
  }
  

  const userExists = await this.findOne({ email });

  if (userExists) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hashedPassword,
    phone_number, 
    gender, 
    date_of_birth, 
    address,    
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);

