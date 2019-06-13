const express=require('express');
const router=express.Router();
const auth=require('../../config/jwt.jobfinder.config');
const jobsdesc=require('../../controllers/jobProvider/jobdesc.controller');
const company=require('../../controllers/jobProvider/companyprofile.controller');

router.post('/register',company.register);
router.post('/login',   company.login);
router.post('/jobs/add',auth.authenticate,jobsdesc.add);
router.get('/jobs/findjobs',auth.authenticate,jobsdesc.jobs);
router.delete("/jobs/:id", auth.authenticate, jobsdesc.delete);
router.get("/job/details/:id", auth.authenticate, jobsdesc.fetchdetails);
router.post("/post/delete", auth.authenticate, jobsdesc.deleteapplicant);
module.exports=router