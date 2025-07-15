const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        required: true,
        unique: true,
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        required: true,
        type: String
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        default: 0,
        get: (value) => parseFloat(value.toFixed(2)), // ✅ Ensure Float Output
        set: (value) => parseFloat(value) // ✅ Ensure Float Input
    },
    reviews: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
                required: true
            },
            username: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true,
                get: (value) => parseFloat(value.toFixed(1)), // ✅ Store rating as float with 1 decimal
                set: (value) => parseFloat(value)
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
            comment: {
                type: String,
            }
        }
    ]
});

// ✅ **Calculate average rating before saving**
ItemSchema.pre('save', function (next) {
    if (this.reviews.length === 0) {
        this.ratings = 0;
    } else {
        const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
        this.ratings = parseFloat((total / this.reviews.length).toFixed(2)); // ✅ Ensure Float Output
    }
    next();
});

const ItemModel = mongoose.model('Items', ItemSchema);

module.exports = ItemModel;
