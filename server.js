const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// الاتصال بقاعدة البيانات
mongoose.connect('mongodb://localhost:27017/mydatabase');


// إنشاء نموذج المستخدم
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// إعدادات الوسيط
app.use(express.json());

// مسار لإنشاء حساب مستخدم جديد
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });
  try {
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send('Error registering user');
  }
});

// بدء الخادم
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

