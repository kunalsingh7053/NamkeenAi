const express = require("express");
const cookieparser = require("cookie-parser")
const authRoutes = require("./routes/auth.routes")
const chatRoutes = require("./routes/chat.routes")
const cors = require("cors")
const app = express();
//using middlewares
app.use(express.json())
app.use(cookieparser())

app.use(cors({
  origin: ["https://namkeenai-1-frontend.onrender.com", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,   // 🔥 must be true for cookies/session
}));


//using routes 
app.use('/api/auth',authRoutes)
app.use('/api/chat',chatRoutes)

module.exports = app;   