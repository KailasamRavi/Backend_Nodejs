const Firm = require("../models/Firm");
const Vendor = require("../models/Vendor");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, files, cb) {
    cb(null, "uploads/"); //Destination folder were the uploaded images will be stored
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
  try {
    const { firmname, area, category, region, offer } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const vendor = await Vendor.findById(req.vendorId);
    // console.log(`firm Controller ${vendor} `);

    if (!vendor) {
      res.status(404).json({ message: "vendor not found" });
    }

    const firm = new Firm({
      firmname,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id,
    });

    console.log(`schema:  ${firm} `);

    const saveFirm = await firm.save();

    vendor.firm.push(saveFirm);

    await vendor.save();

    return res.status(200).json({ message: "Firm added Successfully", firm });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteFirmById = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    const deletedFirm = await Firm.findByIdAndDelete(firmId);

    if (!deletedFirm) {
      return res.status(404).json({ message: " No Firm Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { addFirm: [upload.single("image"), addFirm], deleteFirmById };
