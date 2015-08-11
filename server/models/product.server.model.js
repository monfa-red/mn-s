'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * dashify the name field to be used for a
 * url-firendly api!
 */
function dashify(str) {
  return str.trim().replace(/\s+/g, '-').toLowerCase();
};



/**
 * Product Schema
 */
var ProductSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    unique: true,
    required: 'Product name cannot be blank'
  },
  dashName: {
    type: String
  },
  caption: {
    type: String,
    default: '',
    trim: true,
  },
  description: {
    type: String,
    default: '',
    trim: true,
    required: 'Product description cannot be blank'
  },
  price: {
    type: Number,
    default: '',
    trim: true,
    required: 'Price cannot be blank'
  },
  imageURLs: {
      type: Array,
      default: ['assets/src/images/product-place-holder.png']
  },
  sale: {
    type: Boolean,
    default: false
  }
  // , TODO: figure this out!
  // user: {
  //   type: Schema.ObjectId,
  //   ref: 'User'
  // }
});


ProductSchema.pre('save', function (next) {
  this.dashName = dashify(this.name);
  next();
});

mongoose.model('Product', ProductSchema);