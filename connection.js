import mongoose from "mongoose";

const connectToMongoDB = (url) => {
    return mongoose.connect(url);
}

export default connectToMongoDB;