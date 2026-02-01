const mongoose = require('mongoose');

const newsDataSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  versionData: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  fullData: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  fetchedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update the updatedAt field before saving
newsDataSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('NewsData', newsDataSchema);
