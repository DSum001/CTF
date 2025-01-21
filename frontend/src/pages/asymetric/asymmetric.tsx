import React, { useState } from "react";
import image1 from "../../assets/asym_image1.jpg";
import image2 from "../../assets/asym_image2.jpg";
import image3 from "../../assets/asym_image3.jpg";

const ImageGallery: React.FC = () => (
  <div className="flex flex-row gap-1">
    <img src={image1} alt="Hint 1" className="h-80 rounded-md" />
    <img src={image2} alt="Hint 2" className="h-80 rounded-md" />
    <img src={image3} alt="Hint 3" className="h-80 rounded-md" />
  </div>
);

const AsymmetricPage: React.FC = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showHints, setShowHints] = useState(false); // State to toggle basic hints
  const [showSuperHint, setShowSuperHint] = useState(false); // State to toggle super hint
  const [isPlaintextCorrect, setIsPlaintextCorrect] = useState(false); // Track if plaintext is correct

  const plaintext = "54";
  const finalAnswer = "floods";

  const checkPlaintext = () => {
    if (userInput === plaintext) {
      setFeedback("Correct plaintext! Now, submit the final answer.");
      setIsPlaintextCorrect(true); // Allow transition to final answer input
      setUserInput(""); // Clear input for the final answer
    } else {
      setFeedback("Incorrect plaintext. Please try again.");
    }
  };

  const checkFinalAnswer = () => {
    if (userInput === finalAnswer) {
      setFeedback("Correct! You've passed this Asymmetric Challenge.");
    } else {
      setFeedback("Incorrect answer. Please try again.");
    }
  };

  const toggleSuperHint = () => {
    setShowSuperHint(!showSuperHint); // Toggle the visibility of super hint
  };

  return (
    <div className="flex flex-col gap-1 h-[100vh] bg-red-400 justify-center items-center rounded-md ring-1 ring-red-100 relative">
      <h1 className="text-2xl font-bold">
        Asymmetric Challenge: Find the answer from these images and cipher text
      </h1>
      <ImageGallery />
      <div className="flex flex-col text-center gap-1 w-[480px]">
        <p>Cipher Text: 180</p>
        <label htmlFor="answer-input">
          {isPlaintextCorrect
            ? "Enter the final answer(its should be a word with lowercase 6 letters in English)"
            : "Enter the plaintext you've found first"}
        </label>
        <input
          id="answer-input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          type="text"
          aria-label="Answer input"
          className="w-full mb-4"
        />
        <button
          onClick={isPlaintextCorrect ? checkFinalAnswer : checkPlaintext}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
        >
          {isPlaintextCorrect ? "Submit Answer" : "Submit Plaintext"}
        </button>
        {!isPlaintextCorrect && (
          <button
            onClick={() => setShowHints(!showHints)}
            className="mt-2 bg-green-400 hover:bg-green-500 text-white p-2 rounded-md"
          >
            {showHints ? "Hide Hints" : "Show Hints"}
          </button>
        )}
        {showHints && !isPlaintextCorrect && (
          <div className="mt-2 text-left">
            <p>Hint 1: The first image suggests a method to find the answer.</p>
            <p>Hint 2: Other images provide values to calculate the answer.</p>
            <p>Suggestion: Open the image in a new tab for a better view.</p>
          </div>
        )}
        {isPlaintextCorrect && (
          <div className="mt-2 text-left">
            <button
              onClick={toggleSuperHint}
              className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-md w-full"
            >
              {showSuperHint ? "Hide Super Hint" : "Show Super Hint"}
            </button>
            {showSuperHint && (
              <p className="mt-2 text-yellow-500 font-bold">
                Super Hint: What is the biggest thing that happened in Thailand in the year 25__ (__ is your plaintext)?
              </p>
            )}
          </div>
        )}
        {feedback && (
          <p
            className={
              feedback.includes("Correct")
                ? "text-green-500 font-bold"
                : "text-red-500 font-bold"
            }
          >
            {feedback}
          </p>
        )}
      </div>
    </div>
  );
};

export default AsymmetricPage;
