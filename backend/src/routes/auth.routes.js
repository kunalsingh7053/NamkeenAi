const express = require("express")
const authControllers = require("../controllers/auth.controller")
const router = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")


router.post("/register",authControllers.registerUser)
router.post("/login",authControllers.loginUser)
router.post("/logout",authControllers.logoutUser)
router.get("/profile",authMiddleware.authUser,authControllers.profileUser)
router.delete("/profile",authMiddleware.authUser,authControllers.removeProfileUser)
router.patch("/profile/update",authMiddleware.authUser,authControllers.updateProfileUser
)

module.exports = router   