const ComP = require('../../models/jobProvider/Companyprofile.model');
const Jobdes=require('../../models/jobProvider/Jobdesc.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
module.exports.register=(req,res)=>
{
    console.log(req.body);
    ComP.findOne({email:req.body.email}).
    then((docs)=>
    {
        if(docs)
        {
            console.log('docssdfsfsfsffdasdsf>',docs);
            res.json({status:300,message:"User Already registered"})
        }
        else
        {
            console.log('docs========>',docs);
            let Newcopmany= new ComP(req.body);
            console.log("Newuser===========>",Newcopmany)
            return Newcopmany.save();
        }
    })
    .then((data)=>{
        if(data)
        {
            console.log('data========>',data);
            res.json({status:200,message:"company register sucessfully",data:data})
        }
        else
        {
            console.log('data========>',data);
            res.json({status:101,message:"Some thing went wrong",data:null})
        }
    }).catch((err)=>
    {
        console.log("error is =======>",err.message);
        res.json({status:404,message:err.message,data:null})
    })

}
// here the rough code
// module.exports.login = (req, res) => {
//     console.log('req.body.email===>',req.body.email)
//     ComP.findOne({ email : req.body.email })
   
//         .then((doc) => {
//             if(doc) {
//                 console.log(doc);
                
//                 if(bcrypt.compareSync(req.body.Password,doc.Password))
//                 {
//                     let payload = {
//                         id : doc._id, 
//                     };
//                     console.log('response done sucessfully');
//                     let token = jwt.sign(payload, process.env.SECRET, { expiresIn : '24h' });
//                     res.json({ status : 200, message : 'Authentication successful!', data : { token : token }});
//                 }
//                 else {
//                     res.json({ success : false, message : 'Password incorrect!', data : null });
//                 }
//             }
//             else {
//                 res.json({ success : false, message : 'No such user exists!', data : null });
//             }    
//         })
//         .catch((err) => {
//             res.json({ success : false, message : err.message, data :null });
//         });
// }

module.exports.login = (req, res) => {
    console.log("company login")
    console.log("sadfsaffds==============",req.body);
    ComP.findOne({ email : req.body.email })
        .then((doc) => {
            console.log("data is ",doc);
            
            if(doc) {

               bcrypt.compare(req.body.password, doc.Password,function(err,result){
                  if(result)
                   {

                console.log(result,"++++++++++",err,"err")
                    let payload = {
                        id : doc._id,
                        name:doc.companyName
                    };
                    let token = jwt.sign(payload, process.env.SECRET, { expiresIn : '24h' });
                    res.json({ status : 200, message : 'Authentication successful!', data : { token :  token }});
                }
                else{
                  return  res.json({ success : false, message : 'Password not match', data : null });
                }
            })
                
            }
            else {
                res.json({ success : false, message : 'No such user exists!', data : null });
            }    
        })
        .catch((err) => {
            console.log(err,"err")
            res.json({ success : false, message : err.message, data :null });
        });
}

// module.exports.appliedList=(req,res)=>{
//     console.log(req.body);
//     ComP.findOne({'companyName':req.decoded.name})
//     .select({application:1})
//     .populate('application','name ')
//     .then((docs) =>{
//       console.log(docs)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// }
