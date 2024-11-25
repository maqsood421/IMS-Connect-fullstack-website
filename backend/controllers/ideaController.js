const Idea = require('../models/Idea'); // Import your Idea model
const Vote = require('../models/Vote'); // Import your Idea model
const mongoose = require("mongoose")
// Controller function to create an idea
exports.createIdea = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    // Create a new idea object
    // const user = await User.findById(req.user.id)
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.user)) {
      return res.status(400).json({ message: 'Invalid author ID' });
    }
    const newIdea = new Idea({
      title,
      description,
      tags,
      author_id: req.user // Assuming you're using JWT auth and this comes from the user data
    });
    // Save to database
    await newIdea.save();
    console.log("first")

    // Send a response
    res.status(201).json({ message: 'Idea submitted successfully', idea: newIdea });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
  // res.json({success: true});
};

exports.getIdeas = async (req, res) => {
  try {
    const id = req.user;
    let ideas = await Idea.find({ author_id: id }).lean(); // Fetch ideas and convert to plain JavaScript objects
    
    // Use Promise.all to process vote counts
    const updatedIdeas = await Promise.all(
      ideas.map(async (item) => {
        const cnt = await Vote.countDocuments({ idea_id: item._id }); // Count votes for each idea
        return { ...item, votes: cnt }; // Add vote count to the idea object
      })
    );

    // Send a successful response
    res.status(200).json(updatedIdeas);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ideas", error: error.message });
  }
};

exports.getAllIdeas = async (req, res) => {
  try {
    let ideas = await Idea.find().lean(); // Fetch ideas and convert to plain JavaScript objects

    // Use Promise.all to process vote counts
    const updatedIdeas = await Promise.all(
      ideas.map(async (item) => {
        const cnt = await Vote.countDocuments({ idea_id: item._id }); // Count votes for each idea
        return { ...item, votes: cnt }; // Add vote count to the idea object
      })
    );

    // Send a successful response
    res.status(200).json(updatedIdeas);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ideas", error: error.message });
  }
};
