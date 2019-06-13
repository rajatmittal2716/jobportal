const mongoose=require('mongoose');
// DB Connection
mongoose.connect(`${process.env.DBurl}`, { useCreateIndex : true, useNewUrlParser : true })
        .then(() => {
            console.log('Connected to MongoDB ...');
        })
        .catch((err) => {
            console.log(err);
        });
        module.exports=mongoose;