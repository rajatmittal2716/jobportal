const JobSeakerInfo = require('../../models/jobSeaker/jobseaker.model');
const Companyprofile = require('../../models/jobProvider/Companyprofile.model');
const Jobdes=require('../../models/jobProvider/Jobdesc.model');
// const applicantinfo=require('../../models/jobSeaker/applicantInfo.model');
const jwt=require('jsonwebtoken');
const _=require('lodash');
const bcrypt=require('bcrypt');
require('mongoose');

module.exports.register=(req,res)=>
{
    console.log(req.body);
    JobSeakerInfo.findOne({email:req.body.email}).
    then((docs)=>
    {
        if(docs)
        {
            res.json({status:300,message:"User Already registered"})
        }
        else
        {
            let NewUser= new JobSeakerInfo(req.body);
            return NewUser.save();
        }
    })
    .then((data)=>{

        if(data)
        {
            res.json({status:200,message:"company register sucessfully",data:data})
        }
        else
        {
            res.json({status:404,message:"Some thing went wrong",data:null})
        }
    }).catch((err)=>
    {
        console.log("error is =======>",err.message);
        res.json({status:404,message:err.message,data:null})
    })

}
module.exports.login = (req, res) => {
    console.log('req.body.email===>',req.body.email)
    JobSeakerInfo.findOne({ email : req.body.email })
   
        .then((doc) => {
            if(doc) {
                console.log(doc);
                
                if(bcrypt.compareSync(req.body.password, doc.password))
                {
                    let payload = {
                        id : doc._id, 
                        name: doc.Name
                    };
                    console.log('response done sucessfully');
                    let token = jwt.sign(payload, process.env.SECRET, { expiresIn : '24h' });
                    res.json({ status : 200, message : 'Authentication successful!', data : { token : token }});
                }
                else {
                    res.json({ success : false, message : 'Password incorrect!', data : null });
                }
            }
            else {
                res.json({ success : false, message : 'No such user exists!', data : null });
            }    
        })
        .catch((err) => {
            res.json({ success : false, message : err.message, data :null });
        });
}

module.exports.jobs=(req,res)=>
 {
      console.log(req.body.JobType);
      var checkEmpty=req.body ? req.body :{};
        if(req.body.JobType==null ||req.body.JobType=='')
        {
            res.json({status:402,message:' you are trying a empty request ',data:null});
        }
        else{
      var re = new RegExp(req.body.JobType, "i");
      Jobdes.find({$or: [
        {JobType: {
              $regex: re
         } },
        { Description:{
                $regex: re
              } },
        
      ]  })
// code is on 299// 
    .populate('companyName','-_id  companyName Address Established WorkingOn')
      .then((docus)=>
    {
        console.log(docus,"jdshjdsjkds")
          if(!(docus == []))
          {
              console.log(docus);
              res.json({status:200,message:"Jobs for you",data:docus})
          }
          else
          {
              console.log("docus================",docus);
              res.json({status:403,message:"Not Post Avialble",data:null})
          }
    })
      .catch((err)=>
      {
          console.log('error============>',err.message);
          res.json({status:403,message:err.message,data:null});
      })}
}

// appling for job
// function name jobapply()

module.exports.jobapply=  (req,res)=>{
  

 Jobdes.findOne({'_id':req.body.id}).
then((data)=>{
    if(data)
    
    {
        console.log(data,"darta")
        data.application.push(req.decoded.id)
        data.save()
        .then((data2)=>
        {
            return res.json({status:200,message:"Job applied ",data:data2})
        }).catch((err)=>
        {
            res.json({status:403,message:"Job not avialable ",data:data2})
        })

    }
    else
    {
       res.json({status:403,message:"something went wrong",data:data2})
    }
}).catch((err)=>{
    res.json({status:403,message:err.message,data:null})
})
}


// module.exports.jobs=(req,res)=>{
    //     console.log(req.body.JobType);
    // }
    // module.exports.Userprofile=(req,res)=>
    // {
    //     console.log(req.body);
    //     var checkEmpty=req.body ? req.body :{};
    //     if(_.isEmpty(checkEmpty))
    //     {
    //         res.json({status:402,message:' you are trying a empty request ',data:null});
    //     }
    //     else
    //     {
    //         if(_.isEmpty(checkEmpty.Exprerience) || _.isEmpty(checkEmpty.profile) )
    //         {
    //             res.json({status:402,message:'Pleses fill the data ',data:null});
    //         }
    //         else
    //         {
    //             applicantinfo.save().
    //             then((docs)=>
    //             {
    //                 res.json({status:200,message:"profile saved sucessfully",data:docs});
    //             }).catch((err)=>
    //             {
    //                 console.log(err.message)
    //                 res.json({status:200,message:err.message,data:null});
    //             })
    
    //         }
    //     }
    
    // }
    
//  module.exports.FindJob=(req,res)=>
//  {
//     console.log(req.decoded.name);

//     Compdes.aggregate([
//         {
//             $match: { 'name': req.decoded.name }
//         },
//         {
//             $lookup: {
//                 from: 'lawns',
//                 localField: '_id',
//                 foreignField: 'owner',
//                 as: 'lawns'
//             }
//         },
//         {
//             $unwind: '$lawns'
//         },
//         {
//             $replaceRoot: {
//                 newRoot: "$lawns"
//             }
//         },
//         {
//             $project: { city: "$address.city", area: 1, grassType: 1 }
//         }
//     ])
//  }
// // 
// // 
// // 
// // 
//  module.exports.list = (req, res) => {
//     console.log(req.decoded.id);
//     User.aggregate([
//         {
//             $match: { '_id': mongoose.Types.ObjectId(req.decoded.id) }
//         },
//         {
//             $lookup: {
//                 from: 'lawns',
//                 localField: '_id',
//                 foreignField: 'owner',
//                 as: 'lawns'
//             }
//         },
//         {
//             $unwind: '$lawns'
//         },
//         {
//             $replaceRoot: {
//                 newRoot: "$lawns"
//             }
//         },
//         {
//             $project: { city: "$address.city", area: 1, grassType: 1 }
//         }
//     ])
//         .then((docs) => {
//             res.json({ success: true, message: 'Fetching lawns', data: docs });
//         })
//         .catch((err) => {
//             res.json({ success: false, message: err.message, data: null });
//         })
// }

// module.exports.detail = (req, res) => {
//    CompUser.aggregate([
//         {
//             $match: { 'owner': mongoose.Types.ObjectId(req.decoded.id), '_id': mongoose.Types.ObjectId(req.params.id) }
//         },
//         {
//             $lookup: {
//                 from: 'tempratures',
//                 localField: 'temprature',
//                 foreignField: '_id',
//                 as: 'temprature'
//             }
//         },
//         {
//             $lookup: {
//                 from: 'precipitations',
//                 localField: 'precipitation',
//                 foreignField: '_id',
//                 as: 'precipitation'
//             }
//         },
//         {
//             $unwind: '$temprature'
//         },
//         {
//             $unwind: '$precipitation'
//         }
//     ])
//         .then((doc) => {
//             if (doc) {
//                 // Because aggregation returns an array, therefore we use doc[0] to send an object
//                 res.json({ success: true, message: 'Lawn details fetched!', data: doc[0] });
//             }
//             else {
//                 res.json({ success: true, message: 'No such lawn found!', data: null });
//             }
//         })
//         .catch((err) => {
//             res.json({ success: false, message: err.message, data: null });
//         })
// }

// module.exports.delete = (req, res) => {
//     Lawn.findOneAndRemove({ _id: req.params.id })
//         .then(() => {
//             res.json({ success: true, message: 'Lawn deleted!', data: null });
//         })
//         .catch((err) => {
//             res.json({ success: false, message: err.message, data: null });
//         })
// }

//// $or: [
    // { '_id': param },
    // { 'name': param },
    // { 'nickname': param }
//   ]  
            // {JobType: {
            //   $regex: re
            // }||Description:{
            //     $regex: re
            //   }}