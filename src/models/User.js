import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
    name: String
});

// Expose findAndModify method
userSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
    return this.collection.findAndModify(query, sort, doc, options, callback);
};

export default mongoose.model('User', userSchema);