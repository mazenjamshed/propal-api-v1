const express = require('express');
const authController = require('./../controllers/authController');
const {
  createProperty,
  getProperty,
  getAllProperty,
  updateProperty,
  deleteProperty,
  unApprovedProperties,
} = require('./../controllers/propertyController.js');

const router = express.Router(); // Initialize the Router

router.route('/').get(authController.protect, getAllProperty); // for localhost/property

router.route('/:userId').post(authController.protect, createProperty);

router.route('/unApprovedProperties').get(unApprovedProperties);
router
  .route('/:id')
  .get(getProperty)
  .patch(updateProperty)
  .delete(deleteProperty); // for localhost/property/any-id-here

module.exports = router;
