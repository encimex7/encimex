import mongoose from 'mongoose';

const serviceDetailSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  photo:{
    type: [String],
    required: false,
    default: [],
  }
});

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  main_photo: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  service_detail: {
    type: [serviceDetailSchema],
  },
  photos: { 
    type: [String],
    required: true,
    validate: {
      validator: function(array) {
        return array.length > 0; // Ensure at least one photo
      },
      message: 'At least one photo is required'
    }
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  timestamps: true
});

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

export default Service;
