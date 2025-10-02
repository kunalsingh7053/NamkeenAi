const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const chatController = require('../controllers/chat.controller')
const router = express.Router()
//post:/api/chat/
router.post('/',authMiddleware.authUser,chatController.createChat)


//get
router.get('/',authMiddleware.authUser,chatController.getChats)

router.delete('/:id',authMiddleware.authUser,chatController.deleteChat)
router.get('/messages/:id',authMiddleware.authUser,chatController.getMessagesByChatId)
module.exports = router  