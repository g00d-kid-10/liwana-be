const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    image: {
        type: Buffer,
        required: true
    }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;