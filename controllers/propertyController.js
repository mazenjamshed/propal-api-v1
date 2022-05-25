//Property Model Object from propertyModel file
const { findByIdAndUpdate } = require('../models/userModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Property = require('./../models/propertyModel');

//Create Property

// exports.createProperty = catchAsync(async (req, res) => {
//   const property = await Property.create(req.body);

//   res.status(201).json({
//     status: 'success',
//     data: {
//       property,
//     },
//   });
// });

exports.createProperty = catchAsync(async (req, res) => {
  // console.log(req.body);

  const data = { postedBy: req.params.userId, ...req.body };
  // console.log(data);
  const property = await Property.create(data);

  const user = await User.findByIdAndUpdate(
    { _id: req.params.userId },
    { $push: { properties: property._id } },
    { new: true }
  );

  res.status(201).json({
    status: 'success',
    data: {
      property,
      user,
    },
  });
});

// Get property by id
exports.getProperty = catchAsync(async (req, res) => {
  const property = await Property.findById(req.params.id); // find property in database by id

  res.status(201).json({
    status: 'success',
    data: {
      property,
    },
  });
});

// Get All Properties
exports.getAllProperty = catchAsync(async (req, res) => {
  const property = await Property.find({}); // find all properties from database

  res.status(201).json({
    status: 'success',
    data: {
      property,
    },
  });
});

//Update Property by Id
exports.updateProperty = catchAsync(async (req, res) => {
  const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(201).json({
    status: 'success',
    data: {
      property,
    },
  });
});

// Delete property by Id
exports.deleteProperty = catchAsync(async (req, res) => {
  const property = await Property.findByIdAndDelete(req.params.id, {
    new: true,
  });
  //Deleting property from user refernce is pending

  res.status(201).json({
    status: 'success',
    data: {
      property,
    },
  });
});

///API Features

exports.unApprovedProperties = catchAsync(async (req, res) => {
  const properties = await Property.aggregate([
    {
      $match: { isApproved: false },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      properties,
    },
  });
});