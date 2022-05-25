const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const propertySchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  propertyFor: {
    type: String,
    required: [true, 'Specify for what you want the property For. '],
  },
  propertyType: {
    type: String,
    required: [true, 'Specify the type of Property. '],
  },
  city: String,
  area: String,
  detailedAddress: String,
  phoneNumber: { type: String, requied: [true, 'Phone Number is required!'] },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minLength: [10, 'Description should not be too short'],
    minLength: [20, 'Description should not be too long'],
  },

  detailedAddress: {
    type: String, // Change these to the actual location coordinates
    required: [true, 'address is required'],
  },
  images: [String],
  postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Property = model('Property', propertySchema);

module.exports = Property;
