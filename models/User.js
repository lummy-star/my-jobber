import  mongoose  from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"
import  jwt  from "jsonwebtoken"

const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, 'please provide your name'],
        min:3,
        max: 20,
        trim: true
    },

    email:{
        type: String,
        required: [true, 'please provide your email'],
        validate: {
        validator: validator.isEmail,
        message: 'Please provide a valid email'
        },

        trim: true,
        unique: true,
    },

    password:{
        type: String,
        required: [true, 'please provide your password'],
        min: 6,
        select: false,
    },

    lastName:{
        type: String,
       trim: true,
       max:20,
       default: 'lastName'
    },

    location:{
        type: String,
       trim: true,
       max:20,
       default: 'my city'
    },
})

UserSchema.pre('save', async function() {
    console.log(this.modifiedPaths('name'))
      if (!this.isModified('password')) return 
         const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)  
        
})

 UserSchema.methods.createJWT = function (){
     return jwt.sign ({userId:this._id}, process.env.JWT_SECRET, {
         
             expiresIn: process.env.JWT_LIFETIME 
            // expiresIn: '100',
            })
 }

 UserSchema.methods.comparePassword = async function(candidatePassword) {
     const isMatch = await bcrypt.compare(candidatePassword, this.password)
     return isMatch
 }

export default mongoose.model('User', UserSchema)