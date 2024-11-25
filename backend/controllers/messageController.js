const User = require('../models/User');
const Message = require('../models/Message');

// Route to get all messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate('from', 'name'); // Populate 'from' with user's name
    res.json(messages); // Send all messages in the response
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// Route to post a new message
exports.sendMessage = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Sender ID and text are required.' });
  }

  try {
    const sender = await User.findById(req.user); // Validate sender ID
    if (!sender) {
      return res.status(400).json({ error: 'Invalid sender ID.' });
    }

    const newMessage = new Message({
      from: req.user,
      content: content,
    });

    await newMessage.save(); // Save the new message to the database

    res.status(201).json({ ...newMessage.toObject(), senderName: sender.name }); // Return the message with sender's name
  } catch (error) {
    res.status(500).json({ error: 'Failed to post message' });
  }
};
