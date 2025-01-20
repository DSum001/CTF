import React, { useState } from "react";
import "./stage3.css";
import image1 from "../../assets/stage3_image1.jpg";
import image2 from "../../assets/stage3_image2.jpg";
import image3 from "../../assets/stage3_image3.jpg";

const ImageGallery: React.FC = () => (
  <div className="image-gallery">
    <img src={image1} alt="Hint 1" className="image" />
    <img src={image2} alt="Hint 2" className="image" />
    <img src={image3} alt="Hint 3" className="image" />
  </div>
);

const Stage3Page: React.FC = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");

  const Answer = 54;

  const checkAnswer = () => {
    if (parseInt(userInput) === Answer) {
      setFeedback("Correct! You've passed this stage.");
    } else {
      setFeedback("Incorrect. Please try again.");
    }
  };

  return (
    <div className="stage3-container">
      <h1>Stage 3: Find the Plaintext</h1>
      <ImageGallery />
      <div className="stage3-form">
        <label htmlFor="answer-input">Enter your answer:</label>
        <input
          id="answer-input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          type="text"
          aria-label="Answer input"
        />
        <button onClick={checkAnswer}>Submit</button>
        <p>Cipher Text: 180</p>
        <p>Hint 1: The first image suggests a method to find the answer.</p>
        <p>Hint 2: Other images provide values to calculate the answer.</p>
        {feedback && (
          <p className={feedback.includes("Correct") ? "feedback-correct" : "feedback-incorrect"}>
            {feedback}
          </p>
        )}
      </div>
    </div>
  );
};

export default Stage3Page;
