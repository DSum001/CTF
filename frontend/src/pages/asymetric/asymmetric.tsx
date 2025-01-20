import React, { useState } from "react";
import "./asymmetric.css";
import image1 from "../../assets/asym_image1.jpg";
import image2 from "../../assets/asym_image2.jpg";
import image3 from "../../assets/asym_image3.jpg";

const ImageGallery: React.FC = () => (
  <div className="image-gallery">
    <img src={image1} alt="Hint 1" className="image" />
    <img src={image2} alt="Hint 2" className="image" />
    <img src={image3} alt="Hint 3" className="image" />
  </div>
);

const AsymmetricPage: React.FC = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");

  const Answer = 54;

  const checkAnswer = () => {
    if (parseInt(userInput) === Answer) {
      setFeedback("Correct! You've passed this Asymmetric Challenge.");
    } else {
      setFeedback("Incorrect. Please try again.");
    }
  };

  return (
    <div className="stage3-container">
      <h1>Asymmetric Challenge: Find the Plaintext from these images and cipher text</h1>
      <ImageGallery />
      <div className="stage3-form">
        <p>Cipher Text: 180</p>
        <label htmlFor="answer-input">Enter your answer</label>
        <input
          id="answer-input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          type="text"
          aria-label="Answer input"
        />
        <button onClick={checkAnswer}>Submit</button>
        <p>Hint 1: The first image suggests a method to find the answer.</p>
        <p>Hint 2: Other images provide values to calculate the answer.</p>
        <p>Suggestion: Open image in new tab for better view</p>
        {feedback && (
          <p className={feedback.includes("Correct") ? "feedback-correct" : "feedback-incorrect"}>
            {feedback}
          </p>
        )}
      </div>
    </div>
  );
};

export default AsymmetricPage;
