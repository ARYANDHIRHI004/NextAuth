import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique: true
    },

    email:{
        type:String,
        required:true,
        unique: true
    },
    
    password:{
        type:String,
        required:[true,"Please enter the password"],
    },

    isVerfied:{
        type:Boolean,
        default:false
    },

    isAdmin:{
        type: Boolean,
        default: false
    },

    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyToken : String,
    verifyTokenExpiry : Date,

})
const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User