const mongoose = require('mongoose');

let conn = null;

const uri = process.env.MONGO_URI;

const billSchema = new mongoose.Schema({
  billNumber: String,
  customer: {
    name: String,
  },
  totalAmount: Number,
  dateTime: String,
  notes: String,
  type: String,
  repeat: String,
  cart: [
    {
      product: String,
      price: Number,
    },
  ],
});

let Bill;

async function connectDB() {
  if (conn == null) {
    conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    Bill = mongoose.models.Bill || mongoose.model('Bill', billSchema);
  }
  return conn;
}

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    await connectDB();
    console.log("Received Bill:", req.body); // 🔍 Add this
    try {
      const bill = new Bill(req.body);
      await bill.save();
      res.status(201).json({ message: 'Bill saved successfully!' });
    } catch (error) {
      console.error("Error saving bill:", error.message);
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

