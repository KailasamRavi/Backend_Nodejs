const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secretKey = process.env.WhatIsYourName;

const verifyToken = async (req, res, next) => {
  // Passing token to headers
  const token = req.headers.token;

  // if token is not available token is required with bad req (401)
  if (!token) {
    return res.status(401).json({ error: "Token is Required" });
  }

  // Promise
  try {
    const decoded = jwt.verify(token, secretKey);
    const vendor = await Vendor.findById(decoded.vendorId);
    console.log(`decoded vendorId: ${decoded.vendorId}`);

    if (!vendor) {
      return res.status(404).json({ error: "Vendor not Found in verifytoken" });
    }

    req.vendorId = vendor._id;

    console.log(`vendorId : ${req.vendorId}, ${vendor._id}`);
    next();
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({ error: "Invalid Token" });
  }
};

module.exports = verifyToken;
