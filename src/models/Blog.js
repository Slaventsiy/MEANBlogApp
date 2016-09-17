import mongoose from 'mongoose';

let blogSchema = new mongoose.Schema({
    title: String,
    topic: String,
    text: String,
    public: Boolean,
    _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Blog', blogSchema);