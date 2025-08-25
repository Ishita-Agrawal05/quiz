import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// --- MongoDB Connect ---
mongoose.connect("mongodb://127.0.0.1:27017/quizapp");

// --- User Schema ---
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  phone: String,
  email: { type: String, unique: true },
  password: String,
  quiz1: Array, // store answers
  quiz2: Array,
  quiz3: Array,
});

const User = mongoose.model("User", userSchema);

// --- Register ---
app.post("/register", async (req, res) => {
  try {
    const { name, age, phone, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, age, phone, email, password: hashed });
    await user.save();
    res.send("✅ Registration successful");
  } catch (err) {
    res.status(400).send("❌ Error: " + err.message);
  }
});

// --- Login ---
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("❌ Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send("❌ Invalid email or password");

  const token = jwt.sign({ id: user._id }, "secret123", { expiresIn: "1d" });
  res.json({ token });
});

// --- Middleware to verify JWT ---
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).send("No token provided");
  try {
    const decoded = jwt.verify(header.split(" ")[1], "secret123");
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
}

// --- Submit Quiz ---
app.post("/quiz/:num", auth, async (req, res) => {
  const { num } = req.params;
  const answers = req.body.answers;
  const user = await User.findById(req.userId);

  if (!user) return res.status(404).send("User not found");

  if (num === "1") {
    if (user.quiz1?.length) return res.status(400).send("Already submitted Quiz 1");
    user.quiz1 = answers;
  } else if (num === "2") {
    if (!user.quiz1?.length) return res.status(400).send("Submit Quiz 1 first");
    if (user.quiz2?.length) return res.status(400).send("Already submitted Quiz 2");
    user.quiz2 = answers;
  } else if (num === "3") {
    if (!user.quiz2?.length) return res.status(400).send("Submit Quiz 2 first");
    if (user.quiz3?.length) return res.status(400).send("Already submitted Quiz 3");
    user.quiz3 = answers;
  } else {
    return res.status(400).send("Invalid quiz number");
  }

  await user.save();
  res.send(`✅ Quiz ${num} submitted`);
});

// --- Get All Results ---
app.get("/results", auth, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  if (!user) return res.status(404).send("User not found");
  res.json({
    quiz1: user.quiz1,
    quiz2: user.quiz2,
    quiz3: user.quiz3,
  });
});

// --- Start Server ---
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
