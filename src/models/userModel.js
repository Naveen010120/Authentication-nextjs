import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:[true,"Please provide a Name"],
        unquie:true
    },
password:{
    type:String,
    require:[true,"Please provide a password"]
},
email:{
    type:String,
    require:[true,"Please provide a email"]
},
isVerified:{
    type:Boolean,
    default:false
},
isAdmin:{
    type:Boolean,
    default:false
},
forgotPasswordToken:String,
forgotPasswordExpiry:Date,
verifyToken:String,
verifyTokenExpiry:Date

})
const User = mongoose.models.UserModel || mongoose.model('UserModel', userSchema);

export default User;