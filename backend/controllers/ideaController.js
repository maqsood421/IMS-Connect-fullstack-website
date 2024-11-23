const Idea = require('../models/Idea'); // Import your Idea model

// Controller function to create an idea
exports.createIdea = async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    // Create a new idea object
    const newIdea = new Idea({
      title,
      description,
      tags,
      author_id: req.user.id  // Assuming you're using JWT auth and this comes from the user data
    });

    // Save to database
    await newIdea.save();

    // Send a response
    res.status(201).json({ message: 'Idea submitted successfully', idea: newIdea });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
// res.json({success: true});
};


exports.getIdeas = async (req, res) => {
    res.json({msg: 'success'});
};