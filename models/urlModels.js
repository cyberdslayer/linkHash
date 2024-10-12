const DATABASE_URL = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/url-shortener';
const mongoose = require('mongoose');

const urlMappingSchema = new mongoose.Schema({
    original_url: {
        type: String,
        required: true
    },
    hashed_url: {
        type: String,
        unique: true,
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    max_clicks: {
        type: Number,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const UrlMapping = mongoose.model('UrlMapping', urlMappingSchema);

module.exports = UrlMapping;