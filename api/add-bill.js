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

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Connect to DB and handle POST
  await connectDB();
  try {
    const bill = new Bill(req.body);
    await bill.save();
    res.status(201).json({ message: 'Bill saved successfully!' });
  } catch (error) {
    console.error("Error saving bill:", error.message);
    res.status(400).json({ error: error.message });
  }
};

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

