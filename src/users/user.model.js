import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "This parameter is obligatory"],
  },
  lastName: {
    type: String,
    required: [true, "This parameter is obligatory"],
  },
  email: {
    type: String,
    required: [true, "This parameter is obligatory"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "This parameter is obligatory"],
  },
  role: {
    type: String,
    enum: ['CLIENT', 'ADMIN'],
    default: 'CLIENT'
  },
  state: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model('User', userSchema);