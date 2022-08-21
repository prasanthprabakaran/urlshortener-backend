import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        unique: true,
    },
    clickCount: {
        type: Number,
        default: 0,
    }
});

export const UrlModel = mongoose.model('urlshortener',UrlSchema);

export default UrlModel;