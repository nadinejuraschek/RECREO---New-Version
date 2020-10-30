const mongoose = require('mongoose'),
  Review = require('./Review');

const Schema = mongoose.Schema;

const PlaygroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

PlaygroundSchema.post('findOneAndDelete', async doc => {
  if (doc) {
    await Review.deleteMany({
      _id: { $in: doc.reviews }
    });
  };
});

module.exports = mongoose.model('Playground', PlaygroundSchema);