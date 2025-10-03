const express = require("express");
const cookieparser = require("cookie-parser")
const authRoutes = require("./routes/auth.routes")
const chatRoutes = require("./routes/chat.routes")
const cors = require("cors")
const path = require('path')
const app = express();

//using middlewares
app.use(express.json())
app.use(cookieparser())

app.use(cors({
  origin: ["https://namkeenai-1-frontend.onrender.com", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // 🔥 added PATCH
  credentials: true,
}));
 


//using routes 
app.use('/api/auth',authRoutes)
app.use('/api/chat',chatRoutes)

// Serve frontend static files and enable client-side routing in production
if (process.env.NODE_ENV === 'production') {
  const frontendDist = path.join(__dirname, '../../frontend/dist')
  app.use(express.static(frontendDist))

  // return index.html for any non-API route so React Router can handle it
  app.get('*', (req, res) => {
    // avoid catching API routes
    if (req.path.startsWith('/api/')) return res.status(404).end()
    res.sendFile(path.join(frontendDist, 'index.html'))
  })
}


module.exports = app;   