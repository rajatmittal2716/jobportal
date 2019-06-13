const express=require('express');

const bodyParser=require('body-parser');

const cors=require('cors');

const mongoose=require('mongoose');

const nodemailer=require('nodemailer');
const app=express();
const SeekerUser=require('./routes/jobSeaker/jobfinder.routes');
const companyUser=require('./routes/jobProvider/company.routes'); 

const dotenv = require('dotenv');

dotenv.config();

require('./config/DBconfig');


app.use(cors());
app.use(bodyParser.json());

app.use('/company',companyUser);///company/job/details
app.use('/seeker',SeekerUser);
// sending mails to the applied persons
app.post("/job/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    sendMail(user, info => {
      console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
      res.send(info);
    });
  });
  
  async function sendMail(user, callback) {
      console.log(user,"user");
      
      console.log(user.user.useremail,"sdfsabfgsafkfhsda");
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.user,
        pass: process.env.password
      }
    });
  
    let mailOptions = {
      from: process.env.user, // sender address
      to: user.user.useremail, // list of receivers
      subject: "Wellcome to Fun Of Heuristic 👻", // Subject line
      html: `<h1>Hi ${user.user.username} please come to company for interview</h1><br>
      <h4>Thanks for joining us</h4>`
    };
      // send mail with defined transport object
      let info = await transporter.sendMail(mailOptions);
  
    callback(info);
  }
const port= process.env.PORT
app.listen(port,()=>{
    console.log('server connected');
})