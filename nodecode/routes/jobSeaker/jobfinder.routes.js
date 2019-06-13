const express=require('express');
const router=express.Router();
const auth=require('../../config/jwt.jobfinder.config');
const JobFinder=require('../../controllers/jobseaker/JobFinder.controller');
router.post('/register',JobFinder.register);
router.post('/login',JobFinder.login);
router.post('/jobs',JobFinder.jobs);
router.post('/applyjobs',auth.authenticate,JobFinder.jobapply);
// ,auth.authenticate
module.exports=router;