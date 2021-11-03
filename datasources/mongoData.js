import Mongoose from 'mongoose';

const ViewSchema = Mongoose.Schema({
    blogPostId: Number,
    views: Number,
});
    
const View = Mongoose.model('views', ViewSchema);

export { View };