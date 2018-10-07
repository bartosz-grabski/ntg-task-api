import mongoose from 'mongoose';

const Movie = new mongoose.Schema(
    {
        id: {type: String, required: true, unique: true},
        title: { type: String, required: true },
        description: { type: String, required: true },
        director: { type: String, required: true },
        year: { type: String, required: true},
        poster: { type: String, required: false },
        cast: { type: [String], required: true },
        createdAt: { type: Date, default: Date.now },
    },
    {
        versionKey: false
    }
);


export default mongoose.model('Movie', Movie);
