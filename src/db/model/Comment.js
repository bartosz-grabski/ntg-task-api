import mongoose from 'mongoose';

const Comment = new mongoose.Schema(
    {
        text: { type: String, required: true },
        author: { type: String, required: true },
        movieId : { type: String, required: true},
        createdAt: { type: Date, default: Date.now }
    },
    {
        versionKey: false
    }
);


export default mongoose.model('Comment', Comment);
