const mongoose=require('mongoose')
 const connectDB=async()=>{
    try{  await mongoose.connect(`${process.env.MONGO_URI}/Billing`)
    console.log("db connected sucessfully");   

    }catch(err)
    {
        console.log(err);
        
    }
  
}
module.exports={connectDB}
