const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const CompanyUser=mongoose.Schema({
    
    companyName:
    {
        type :String,
        require:true,
        unique:true    
    },
    Address:
    {
        type:String,
        require:true
    },
    Established:
    {
        type:Date,
        default:Date.now,
        require:true
    },
    WorkingOn:
    {
        type:String,
        require:true
    },
    email:
    {
        type:String,
        require:true,
        unique:true
    },
    contact:
    {
        type:Number,
        require:true,
        maxlength:[10,"Maximum value"],
        minlength:10,

    },
    JobVacancies:
    {
        type:String,
        require:true
    },
    Password:
    {
        type:String,
        require:true
    },
    application:
    [
         {
             type:mongoose.Schema.Types.ObjectId,
             ref : 'JobFinder'
         }
    ]  
},{timestamps: true}
)
CompanyUser.pre('save',function(next){
   
    bcrypt.hash(this.Password,10,(err, hash) => {
        if(err) {
            console.log(err);
        }
        else {
            this.Password = hash;
            next();
        }
    })
});
module.exports=mongoose.model('Companyprofile',CompanyUser);