const mongoose = require('../../app/database-');
const SHA256 = require('crypto-js/sha256');
const { nanoid } = require('nanoid');
const validateEmail = require('../../utils/validateEmail');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: nanoid,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, 'email no válido.'],
  },
  repos: { type: Number },
});

userSchema.pre('save', function (next) {
  const user = this;

  user.password = SHA256(user.password);
  next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
  let update = { ...this.getUpdate() };

  // Only run this function if password was modified
  if (update.password) {
    // Hash the password
    update.password = await SHA256(update.password);
    this.setUpdate(update);
    next();
  }
});
const User = mongoose.model('User', userSchema);

module.exports = User;
