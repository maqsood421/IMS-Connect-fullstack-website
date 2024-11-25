import React, { useState } from 'react';
import '../index.css'; 

const IdeaSubmission = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !description || !tags) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      // API call to submit the idea
      const response = await fetch('http://localhost:5000/api/ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Assuming JWT token is stored in localStorage
          'Authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title, description, tags }),
      });

      const data = await response.json();
console.log(data)
      if (response.ok) {
        setSuccessMessage('Idea submitted successfully!');
        setTitle('');
        setDescription('');
        setTags('');
        setErrorMessage('');
      } else {
        setErrorMessage(data.message || 'An error occurred');
      }
    } catch (error) {
      setErrorMessage('Server error');
    }
  };

  return (
    <div className="idea-submission-page">
      <main>
        <h1>Idea Submission</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your idea title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the problem and proposed solution"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags:</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter comma-separated tags"
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <button type="submit" className="submit-btn">Submit Idea</button>
        </form>
      </main>
    </div>
  );
};

export default IdeaSubmission;
