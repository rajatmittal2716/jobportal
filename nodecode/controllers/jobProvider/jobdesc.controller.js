const ComP = require('../../models/jobProvider/Companyprofile.model');
const Jobdes=require('../../models/jobProvider/Jobdesc.model');
const mongoose=require('mongoose');
const  jobseeker=require('../../models/jobSeaker/jobseaker.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
module.exports.add = (req, res) => {
    // console.log(req.body,"body");
    // console.log(req.decoded,"SDAdsad")
    req.body.jobs.companyName = req.decoded.id;
    // checking the id of the company and the data of the job saved in to db
    // console.log(req.body);
    let jobs = new Jobdes(req.body.jobs);
    jobs.save()
        .then((doc) => {
            res.json({ status: 200, message: 'Job Created', data: doc });
        })
        .catch((err) => {
            res.json({  status: 403, message: err.message, data: null });
        })
}
module.exports.jobs = (req, res) => {  
    Jobdes.find({companyName:mongoose.Types.ObjectId(req.decoded.id)})
    .populate('companyName','-_id  companyName Address Established WorkingOn')
    .populate('application','-_id  name address email')   
     .then((docs) => {
        // console.log("company name ",docs);
       
        if(docs){
            res.json({ success : true,status:200,message : 'Fetching lawns', data : docs });
        }
        
    })
    .catch((err) => {
        res.json({ success : false, message : err.message, data : null });
    })
}
//

module.exports.delete = (req, res) => {
    Jobdes.findOneAndRemove({ _id: req.params.id })
        .then(() => {
            res.json({ success: true, message: 'Job Post Deleted ', data: null });
        })
        .catch((err) => {
            res.json({ success: false, message: err.message, data: null });
        })
}

module.exports.fetchdetails=(req,res)=>
{
console.log(req.params.id,"sdfsadfffsfdssdfsa");
console.log(req.decoded.id,"decoded is here");
Jobdes.findOne({'_id':req.params.id}).
then((data)=>
{
    if(data)
    {
       return  jobseeker.find({_id:{$in:data.application}})
        .select({_id:1,name:1,address:1,email:1,exprerience:1,intrestedin:1,technology:1})
       
      
    }

}).then((data1) =>
{
if(data1)
{
    console.log("we are here finding the ans",data1);
   res.json({status:200,message:"total no of applications find",data:data1});
}
else{
    res.json({status:403,message:"something went wrong",data:null});
}

})
.catch((err) =>
{
    console.log(err);
    res.json({status:403,message:err.message,data:null});
})
}


module.exports.deleteapplicant=(req,res)=>
{
console.log('body',req.body);
console.log('postid is==>',req.body.id.pstid);

        let userid=req.body.id.userid;
        console.log(userid);
         Jobdes.updateOne(
           {
            _id:mongoose.Types.ObjectId(req.body.id.pstid)   
           },
           {$pull:{application:{$in:[mongoose.Types.ObjectId(userid)]}}}
       )
    
.then((data1)=>
{
    res.json({status:200,message:"User application delete sucessfully",data:data1})
}).catch((err)=>
{
    console.log(err,"error");
    res.json({status:403,message:err.message,data:null})
})

}

