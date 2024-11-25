import { useEffect, useState } from "react";
import "../index.css"; // Import the associated CSS for styling

function Rewards() {
  const [ideas, setIdeas] = useState([]); // State for ideas
  const [loggedInUserId, setLoggedInUserId] = useState(null); // State for logged-in user's ID
  const [message, setMessage] = useState(""); // State for displaying success/error messages

  useEffect(() => {
    // Decode JWT token to get the logged-in user's ID
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      setLoggedInUserId(decodedToken.user_id); // Assuming JWT contains user_id field
    }

    // Fetch all ideas
    fetch("http://localhost:5000/api/ideas", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
    })
      .then((resp) => resp.json())
      .then((res) => {
        setIdeas(res); // Update state with fetched ideas
      })
      .catch((error) => console.error("Error fetching ideas:", error));
  }, []);

  // Handle voting
  const handleVote = (idea_id) => {
    // Prevent voting for your own idea
    const idea = ideas.find((idea) => idea._id === idea_id);
    if (idea.author_id === loggedInUserId) {
      setMessage("You cannot vote for your own idea!");
      return;
    }

    // Send POST request to cast a vote
    fetch("http://localhost:5000/api/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
      body: JSON.stringify({ idea_id }), // Send the ideaId in the request body
    })
      .then((resp) => {
        if (resp.status === 400) {
          return resp.json().then((data) => {
            setMessage(data.message); // Set the error message
            throw new Error(data.message);
          });
        }
        return resp.json();
      })
      .then((res) => {
        setMessage("Vote cast successfully!"); // Set success message

        // Update the votes count locally
        setIdeas((prevIdeas) =>
          prevIdeas.map((idea) =>
            idea._id === idea_id
              ? { ...idea, votes: (idea.votes || 0) + 1 } // Increment votes
              : idea
          )
        );
      })
      .catch((error) => console.error("Error casting vote:", error));
  };

  return (
    <div className="rewards-container" style={{ minHeight: "100vh" }}>
      <h1 className="rewards-header">Rewards System</h1>

      <p
        className="rewards-intro"
        style={{ maxWidth: "700px", textAlign: "center", margin: "auto" }}
      >
        IMS-Connect fosters participation through a dynamic point system where
        users are rewarded for their contributions. This system promotes healthy
        competition and a sense of achievement among employees.
      </p>

      <h2 className="rewards-subheader">Voting Mechanism</h2>

      {/* Display message dynamically */}
      {message && (
        <div
          className={`message ${message.startsWith("Error") ? "error" : "success"}`}
          style={{ textAlign: "center" }}
        >
          <span className="icon">{message.startsWith("Error") ? "✘" : "✓"}</span>
          <p>{message}</p>
        </div>
      )}

      <div className="ideas-container" style={{ height: "fit-content" }}>
        <div className="ideas-list">
          {ideas.length > 0 ? (
            ideas.map((idea) => (
              <div className="idea-card" key={idea._id}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3 className="idea-title">{idea.title}</h3>
                  <h3 className="idea-title">Votes: {idea.votes || 0}</h3>
                </div>
                <p className="idea-description">{idea.description}</p>
                <button
                  className="vote-button"
                  onClick={() => handleVote(idea._id)}
                  disabled={idea.author_id === loggedInUserId} // Disable vote button for own ideas
                >
                  {idea.author_id === loggedInUserId
                    ? "You cannot vote for your own idea"
                    : "Vote"}
                </button>
              </div>
            ))
          ) : (
            <h1 style={{ color: "red" }}>No Ideas to display!</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Rewards;
