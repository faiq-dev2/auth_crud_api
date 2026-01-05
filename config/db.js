import mongoose from "mongoose";

const connect = async () => { 
    try{
    await mongoose.connect("mongodb+srv://faiqdev:faiqdev@rolebased.yg1b0u2.mongodb.net/?appName=rolebased");
    console.log("MongoDB connected");
    }
    catch(err){
        console.log("MongoDB connection failed", err);
    }
}


export default connect;
