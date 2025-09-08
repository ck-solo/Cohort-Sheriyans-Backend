const chatModel = require('../models/chat.models')

async function createChat(req, res) {
    try {
        const { title } = req.body

        const chat = await chatModel.create({
            user: req.user.id, // <-- authenticated user
            title
        })
        
        res.status(201).json({
            message: 'Chat created successfully',
            chat: {
                _id: chat._id,
                title: chat.title,
                lastActivity: chat.lastActivity,
                user: chat.user
            }
        })
    } catch (err) {
        res.status(500).json({ message: "Failed to create chat", error: err.message })
    }
}


module.exports = {
    createChat
}