const XLSX = require("xlsx");
const fs = require("fs");
const util = require("util");
const unLinkFile = util.promisify(fs.unlink);
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const Company = require("../model/company.model");
const User = require("../model/user.model");
const Drive = require("../model/drive.model");
const { decodedString } = require("../helper/utility");
const { inviteEmail } = require("../helper/mailHelper");

const uploadExcel = async (req, res, next) => {
  try {
    const file = XLSX.readFile(req.file.path);
    const sheetNames = file.SheetNames;

    let parsedData = [];
    const tempData = XLSX.utils.sheet_to_json(file.Sheets[sheetNames]);
    parsedData.push(...tempData);
    const data = JSON.parse(JSON.stringify(parsedData));
    await unLinkFile(req.file.path);

    if (data.length) {
      if (
        Object.keys(data[0]).length === 2 &&
        Object.keys(data[0])[0] === "companyName" &&
        Object.keys(data[0])[1] === "location"
      ) {
        await Company.deleteMany({});
        await Company.insertMany(data, function (error, docs) {
          if (error) {
            next(error);
          } else if (docs) {
            res
              .status(200)
              .json({ message: "Company added successfully", error: false });
          }
        });
      } else {
        return res.status(502).json({
          error: false,
          message: "Please provide proper file and upload.",
        });
      }
    } else {
      res.status(502).json({ error: true, message: "Operation failed" });
    }
  } catch (err) {
    next(err);
  }
};

const exportExcel = async (req, res, next) => {
  try {
    const company = await Company.find(
      {},
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );

    let data = [];
    if (company.length) {
      data = JSON.parse(JSON.stringify(company));
    } else {
      data = [{ companyName: "", location: "" }];
    }

    const ws = XLSX.utils.json_to_sheet([...data]);
    let wscols = [{ wch: 20 }, { wch: 25 }];
    ws["!cols"] = wscols;
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "employee");

    XLSX.write(wb, { bookType: "xlsx", type: "array" });
    XLSX.write(wb, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(wb, "EXCEL.xlsx");

    const filepath = path.join(__dirname, "../EXCEL.xlsx");
    res.sendFile(filepath, async err => {
      if (err) {
        console.log(err); // Check error if you want
      }
      await unLinkFile(filepath);
    });
  } catch (err) {
    next(err);
  }
};

const addCompany = async (req, res, next) => {
  try {
    const { companyName, location } = req.body;
    const company = await Company({ companyName, location }).save();
    if (company) {
      res.status(200).json({
        error: false,
        message: "Company added successfully",
        data: company,
      });
    } else {
      res.status(502).json({
        error: true,
        message: "Operation failed",
      });
    }
  } catch (err) {
    next(err);
  }
};

const getAllCompany = async (req, res, next) => {
  try {
    const company = await Company.find({});
    res.status(200).json({
      error: false,
      message: "Company fetched successfully",
      data: company,
    });
  } catch (err) {
    next(err);
  }
};

const deleteCompany = async (req, res, next) => {
  try {
    const { companyId } = req.body;
    const { deletedCount } = await Company.deleteMany({
      _id: { $in: companyId },
    });
    if (deletedCount > 0) {
      res
        .status(200)
        .json({ error: false, message: "Company deleted successfully" });
    } else {
      res.status(502).json({ error: true, message: "Operation failed" });
    }
  } catch (err) {
    next(err);
  }
};

const updateCompany = async (req, res, next) => {
  try {
    const { companyId, companyName, location } = req.body;
    const company = await Company.findOne({ _id: companyId });
    if (!company) {
      return res
        .status(502)
        .json({ error: true, message: "Company not found" });
    }

    company.companyName = companyName;
    company.location = location;

    const data = await company.save();

    res.json({ error: false, message: "Company updated successfully", data });
  } catch (err) {
    next(err);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const user = await User.find({role:{$in:["user","admin"]}});

    const data = [];
    JSON.parse(JSON.stringify(user)).map(item => {
      data.push({
        ...item,
      });
    });

    res
      .status(200)
      .json({ error: false, message: "User fetched successfully", data: data });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { email,fullName,mobile,_id} = req.body;
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(503).json({ error: false, message: "User not found" });
    }

    // const duplicate = await User.findOne({ userId });
    // if (duplicate && user.userId !== userId) {
    //   return res
    //     .status(503)
    //     .json({ error: true, message: "User name is already present" });
    // }

    user.fullName = fullName;
    user.mobile=mobile;
    user.email=email
   
    const data = await user.save();

    res
      .status(200)
      .json({ error: false, message: "User updated successfully", data });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { deletedCount } = await User.deleteOne({ email });
    if (deletedCount) {
      res.json({ error: false, message: "User deleted successfully" });
    } else {
      res.json({ error: false, message: "User not found" });
    }
  } catch (err) {
    next(err);
  }
};

const inviteUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(503).json({ error: true, message: "User not found" });
    }
    await inviteEmail(email,role,fullName);
    res.status(200).json({ error: false, message: "Invite sent successfully" });
  } catch (err) {
    next(err);
  }
};

const addDrive = async (req, res, next) => {
  try {
    const { driveName, driveLocation, driveDate } = req.body;

    const uuid = uuidv4();

    const drive = await Drive({
      driveId: uuid,
      driveName,
      driveLocation,
      driveDate,
    }).save();
    res
      .status(200)
      .json({ error: false, message: "Drive added successfully", data: drive });
  } catch (err) {
    next(err);
  }
};

const getAllDrive = async (req, res, next) => {
  try {
    const drive = await Drive.find({});
    res.status(200).json({
      error: false,
      message: "Drive fetched successfully",
      data: drive,
    });
  } catch (err) {
    next(err);
  }
};

const updateDrive = async (req, res, next) => {
  try {
    const { driveId, driveName, driveLocation, driveDate } = req.body;
    const drive = await Drive.findOne({ driveId });
    if (!drive) {
      return res
        .status(503)
        .json({ error: false, message: "Drive is not found" });
    }

    drive.driveName = driveName;
    drive.driveLocation = driveLocation;
    drive.driveDate = driveDate;
    const updateDrive = await drive.save();

    res.status(200).json({
      error: false,
      message: "Drive updated successfully",
      data: updateDrive,
    });
  } catch (err) {
    next(err);
  }
};

const deleteDrive = async (req, res, next) => {
  try {
    const { driveId } = req.body;
    const { deletedCount } = await Drive.deleteMany({
      driveId: { $in: driveId },
    });
    if (deletedCount > 0) {
      res
        .status(200)
        .json({ error: false, message: "Drive deleted successfully" });
    } else {
      res.status(502).json({ error: true, message: "Operation failed" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadExcel,
  exportExcel,
  addCompany,
  getAllCompany,
  deleteCompany,
  updateCompany,
  getAllUser,
  addDrive,
  updateUser,
  deleteUser,
  inviteUser,
  getAllDrive,
  updateDrive,
  deleteDrive,
};
