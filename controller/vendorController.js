const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();
const secretKey = process.env.WhatIsYourName;

const vendorRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const vendorEmail = await Vendor.findOne({ email });
    if (vendorEmail) {
      return res.status(400).json("Email already taken");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newVendor = new Vendor({
      username,
      email,
      password: hashedPassword,
    });

    await newVendor.save();

    res.status(201).json({ message: "Vendor Registered Successfully" });
    console.log("Registered");
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const vendorLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.findOne({ email });

    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ message: "Invalid UserName or Password" });
    }

    const token = jwt.sign({ vendorId: vendor._id }, secretKey);

    res.status(200).json({ message: "LoggedIn Successfully", token });
    console.log(
      `LoggedIn Successfully ${vendor.username} and password is ${vendor.password} token is : ${token}`
    );
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "User Not Found" });
  }
};

// Get all records from vendorControllers

const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("firm");
    res.json({ vendors });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getVenderById = async (req, res) => {
  const vendorId = req.params.id;
  try {
    const vendor = await Vendor.findById(vendorId).populate("firm");
    if (!vendorId) {
      return res
        .status(404)
        .json({ error: "Vendor Not Found in getVenderById" });
    }
    res.status(200).json({ vendor });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { vendorRegister, vendorLogin, getAllVendors, getVenderById };
