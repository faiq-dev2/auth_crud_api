import mongoose, { Mongoose } from "mongoose";


const Schema = mongoose.Schema;

const UserSchema = new Schema({

    name:{
        type:"String",
    },
    email:{
        type:"String",
        required:true
    },
    pass:{
        type:"String",
        required:true
    }

});

export default mongoose.model("user",UserSchema);