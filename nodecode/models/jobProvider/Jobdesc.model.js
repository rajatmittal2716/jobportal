const mongoose=require('mongoose');
const JobSchema=mongoose.Schema({
    companyName:
    {

        type :mongoose.Schema.Types.ObjectId,
        ref : 'Companyprofile'
    
    },
    Employees:
    {
        type:Number,
        require:true
    },
    JobType:                                                                               
    {   
     type:String,
     require:true
    },
    Salary:
    { 
        type:Number,
        require:true
    },
    Description:
    {
        type:String,
        require:true
    },
    Procedure:
    {
        type:String,
        require:true
    },
    Vacancies:
    {
        type:Number,
        require:true
    },
    experience:
    {
        type:Number,
        require:true
    },
    application:
    [
         {
             type:mongoose.Schema.Types.ObjectId,
             ref : 'JobFinder',
            
         }
    ]  
},
{timestamps: true})

module.exports=mongoose.model('JobDescription',JobSchema);