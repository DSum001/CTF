import React, { useState } from 'react';
import './login.css';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [hintMessage, setHintMessage] = useState<string>('');
  const [gameMessage, setGameMessage] = useState<string>(''); // For game-like success message
  const [fireworksVisible, setFireworksVisible] = useState<boolean>(false); // For controlling fireworks effect visibility
  const [isStarted, setIsStarted] = useState<boolean>(false); // For showing the "Press to Start" screen

  const correctPassword = 'ENG23 4041';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === 'admin' && password === correctPassword) {
      onLogin();
      setGameMessage('Congratulations, you have successfully logged in! 🎉');
      setFireworksVisible(true); // Trigger the fireworks effect
    } else {
      setErrorMessage('Invalid credentials');
    }
  };

  const handleHintRequest = () => {
    setHintMessage('Hint: The correct password is the year the university was founded.');
  };

  const startGame = () => {
    setIsStarted(true);
  };

  return (
    <div className="login-container">
      {!isStarted ? (
        // Show the "Press to Start" button if the game hasn't started yet
        <div className="start-screen">
          <h1>Welcome! Ready to Play?</h1>
          <button className="start-btn" onClick={startGame}>Press to Start</button>
        </div>
      ) : (
        // Show the login form if the game has started
        <>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className="input"
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="input"
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div>
              <button type="submit" className="submit-btn">Login</button>
            </div>
          </form>

          {/* Show hint message */}
          <div className="hint-section">
            {hintMessage && <p className="hint-message">{hintMessage}</p>}
            <button onClick={handleHintRequest} className="hint-btn">
              Need a Hint?
            </button>
          </div>

          {/* Show the game success message after successful login */}
          {gameMessage && <div className="game-success-message">{gameMessage}</div>}

          {/* Fireworks Effect */}
          {fireworksVisible && (
            <div className="fireworks-container">
              <div className="confetti confetti-1"></div>
              <div className="confetti confetti-2"></div>
              <div className="confetti confetti-3"></div>
              {/* More confetti can be added as needed */}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LoginPage;
