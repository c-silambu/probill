const mongoose=require('mongoose')
const billSchema =new mongoose.Schema({
    invoiceNo:{
        type:String,
        required:true,
        unique:true,
    },
    items:[
        {
            productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
            pname:String,
            price:Number,
            quantity:Number,
            total:Number,
            pcat:String,
        }
    ],
    totalAmount:{ type:Number,required:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId,
        ref:'Mser',
        required:true

    },
    createdAt:{type:Date,default:Date.now}
    


});
module.exports=mongoose.model('Bill',billSchema)