const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a host as the first player'],
    unique: true,
    trim: true,
    maxlength: [25, 'The name can not be more than 25 characters'],
  },
  role: {
    type: String,
    default: null,
  },
});

const GameSchema = new mongoose.Schema({
  host: {
    type: String,
    required: [true, 'Please add a host'],
    unique: false,
    trim: true,
    maxlength: [25, 'The name can not be more than 25 characters'],
  },
  players: [PlayerSchema],
  numOfCompletedRounds: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
    required: [true, 'Please add a round number'],
  },
  isInProgress: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.models.Game || mongoose.model('Game', GameSchema);
