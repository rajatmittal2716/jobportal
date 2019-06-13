const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const JobFinder=mongoose.Schema({
    name:
    {
        type :String,
        require:true,
          
    },
    address:
    {
        type:String,
        require:true
    },
    email:
    {
        type:String,
        require:[true,"it should follow the email all requirement"],
        unique:true
    },
    contact:
    {
        type:Number,
        require:true,
        maxlength:[10,"Mobile no should contain 10 number atmost"],
        minlength:[10,"Mobile no should contain 10 number atleast"]

    },
    password:
    {
        type:String,
        require:true
    }, 
    exprerience:
    {
        type:String,
        
    },
    position:
    {
        type:String,
        
    },
    intrestedin:
    {
        type:String,

    },
    technology:
    {
        type:String,
    },
    appliedin:
    [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'companyprofile'
        }
    ]  
},{timestamps: true}
)
JobFinder.pre('save', function(next){
   
    bcrypt.hash(this.password, 10, (err, hash) => {
        if(err) {
            console.log(err);
        }
        else {
            this.password = hash;
            next();
        }
    })
});
module.exports=mongoose.model('JobFinder',JobFinder);


