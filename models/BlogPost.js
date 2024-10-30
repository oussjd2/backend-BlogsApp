import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    commentAuthor: { type: String, required: true },
    content: { type: String, required: true },
    dateOfCreation: { type: Date, default: Date.now }
});

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    tags: [String],
    dateOfCreation: { type: Date, default: Date.now() },
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 },
    images: [String],
    comments: [commentSchema],
    disableComments: {
        type: Boolean,
        default: false
    }

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

blogPostSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

export const BlogPost = mongoose.model('BlogPost', blogPostSchema);
