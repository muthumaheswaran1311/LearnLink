import mongoose from 'mongoose'

const connectDb = async () => {
    await mongoose.connect("mongodb+srv://muthumaheswaranm:muthu2005@cluster0.afgns0r.mongodb.net/learnlink");
    console.log("Database Connected Successfully");
}

export default connectDb;
