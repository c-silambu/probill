const mongoose = require('mongoose');

const MserSchema = new mongoose.Schema({
   username: {
    type: String,
    unique: true,
    sparse: true  
  },
  password: {
    type: String,
    required: [true,"password is required"]
  },
  role: {
    type: String,
    enum: ['staff', 'admin'],
    default:'staff'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Mser', MserSchema);
