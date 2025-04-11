const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Example route
app.post('/api/add-bill', async (req, res) => {
  const { billNumber, customer, totalAmount, dateTime, notes, type, repeat, cart } = req.body;
  const newBill = new Bill({
    billNumber,
    customer,
    totalAmount,
    dateTime,
    notes,
    type,
    repeat,
    cart
  });

  try {
    await newBill.save();
    res.status(201).json({ message: 'Bill added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding bill', error: err.message });
  }
});

// MongoDB connection setup
mongoose.connect('mongodb+srv://praveena:praveena19@paytrack.y4owi.mongodb.net/billing_db?retryWrites=true&w=majority&appName=paytrack', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
