const Bill=require('../models/Billmodel')
const Product=require('../models/productmodel')

const createBill = async (req, res) => {
  try {
    const { items, totalAmount, invoiceNo, date } = req.body;

    // 🔥 STOCK CHECK & REDUCE
    for (let item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.pname}`,
        });
      }

      // ✅ reduce stock
      product.stock -= item.quantity;
      await product.save();
    }

    // ✅ Save bill
    const bill = new Bill({
      invoiceNo,
      date,
      items,
      totalAmount,
      createdBy: req.user.id,
    });

    await bill.save();

    res.status(201).json({ message: "Bill created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createBill };



const getAllbills=async(req,res)=>{
    try{
        const bills=await Bill.find().populate('createdBy','username').populate('items.productId','pname');
        res.json(bills);

    }catch(err){
        res.status(500).json({message:err.message});
    }
}

const getMyBills=async(req,res)=>{
    try{
         console.log("TOKEN USER ID:", req.user.id);

    const bill = await Bill.find({});
    console.log("ALL BILLS:", bill);
        const bills=await Bill.find({createdBy:req.user.id}).populate('items.productId','pname');
        res.json(bills);
        
    }catch(err){
        res.status(500).json({message:err.message  });

    }
}

module.exports={getMyBills,getAllbills,createBill}