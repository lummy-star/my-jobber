import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema({

    company:{
        type: String,
        required: [true, 'please provide your company'],
        maxLength: 50,
     
 }, 
    position:{
        type: String,
        required: [true, 'please provide your position'],
        max: 100,
     
 }, 

    status:{
        type: String,
       enum:['interview', 'declined', 'pending'],
       default: 'pending',
       
 }, 
    jobType:{
        type: String,
       enum:['full-time', 'part-time', 'pending', 'remote', 'internship'],
       default: 'pending',     
 }, 
     jobLocation:{
        type: String,
       default:'my city',  
       required: true,   
 }, 
 CreatedBy: {
     type:mongoose.Types.ObjectId,
     ref: 'User',
     required:[true, 'Please provide User']
 }
 }, {timestamps: true}
 
 )
 export default mongoose.model('Job', JobSchema)