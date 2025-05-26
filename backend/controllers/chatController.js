const ChatLog = require('../models/ChatLog');

// @desc    Save chat message
// @route   POST /api/chat/log
// @access  Private
exports.saveChatLog = async (req, res) => {
  const { user_id, message, reply } = req.body;

  try {
    const chatLog = new ChatLog({
      user_id,
      message,
      reply,
    });

    await chatLog.save();

    res.status(201).json({ success: true, data: chatLog });
  } catch (error) {
    console.error('Error saving chat log:', error);
    res.status(500).json({ success: false, message: 'Error saving chat log' });
  }
};

// @desc    Get chat logs for a user
// @route   GET /api/chat/log/:userId
// @access  Private
exports.getChatLogs = async (req, res) => {
  const { userId } = req.params;

  try {
    const chatLogs = await ChatLog.find({ user_id: userId }).sort({ timestamp: 1 });
    res.status(200).json({ success: true, data: chatLogs });
  } catch (error) {
    console.error('Error fetching chat logs:', error);
    res.status(500).json({ success: false, message: 'Error fetching chat logs' });
  }
}; 