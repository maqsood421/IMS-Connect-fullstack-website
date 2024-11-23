import '../index.css'; // Import the associated CSS for styling

function Rewards() {
  const ideas = Array(20).fill({
    id: 1,
    title: "Idea 1",
    description: "Checking my ideas object",
  });

  return (
    <div className="rewards-container">
      <h1 className="rewards-header">Rewards System</h1>

      <p className="rewards-intro">
        IMS-Connect fosters participation through a dynamic point system where users are rewarded for their contributions. This system promotes healthy competition and a sense of achievement among employees.
      </p>

      <h2 className="rewards-subheader">Voting Mechanism</h2>
      <div className="ideas-container">
        <div className="ideas-list">
          {ideas.map((idea, index) => (
            <div className="idea-card" key={index}>
              <h3 className="idea-title">{idea.title}</h3>
              <p className="idea-description">{idea.description}</p>
              <button className="vote-button">Vote</button>
            </div>
          ))}
        </div>
      </div>

      <p className="rewards-conclusion">
        The rewards system ensures active engagement and innovation, making IMS-Connect a thriving platform for growth and collaboration.
      </p>
    </div>
  );
}

export default Rewards;
