const Bill = require('../models/Billmodel');

const getDashboardSummary = async (req, res) => {
  try {
    const userFilter = req.user.role === 'admin' ? {} : { createdBy: req.user.id };

    const bills = await Bill.find(userFilter);

    // Build category-wise summary
    const categorySummary = {};

    bills.forEach(bill => {
      bill.items.forEach(item => {
        const category = item.pcat;
        console.log(category);
        
        if (!categorySummary[category]) {
          categorySummary[category] = { totalQty: 0, totalAmount: 0, items: [] };
        }
        categorySummary[category].totalQty += item.quantity;
        categorySummary[category].totalAmount += item.total || (item.price * item.quantity);
         categorySummary[category].items.push({
  name: item.pname,          // 🔥 FIX
  category: category,        // 🔥 ADD
  qty: item.quantity,
  amount: item.total || (item.price * item.quantity),

        });
      });
    });

    res.json({
      categorySummary,
      totalInvoices: bills.length,
      todaySales: bills.reduce((sum, bill) => sum + bill.totalAmount, 0)
    });
    console.log(bill.items);


  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRecentBills = async (req, res) => {
  console.log(req.user.role);
  
  try {
    const userFilter =
      req.user.role === "admin"
        ? {}
        : { createdBy: req.user.id };

    const bills = await Bill.find(userFilter)
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("createdBy", "username");

    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getDashboardSummary,getRecentBills };
