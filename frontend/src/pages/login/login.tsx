import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [hintMessage, setHintMessage] = useState<string>('');
  const [gameMessage, setGameMessage] = useState<string>('');
  const navigate = useNavigate();
  const [fireworksVisible, setFireworksVisible] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const correctPasswordHash = CryptoJS.SHA256(
    '01000101010011100100011100110010001100110010000000110100001100000011010000110001'
  ).toString();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userPasswordHash = CryptoJS.SHA256(password).toString();
    if (userPasswordHash === correctPasswordHash) {
      onLogin();
      setGameMessage('Congratulations, you have successfully logged in! 🎉');
      setFireworksVisible(true);
      setTimeout(() => {
        navigate('/hash');
      }, 2000);
    } else {
      setErrorMessage('Invalid credentials');
    }
  };

  const handleHintRequest = () => {
    setHintMessage('Hint: คุณอาจมองไมเห็นเพราะมันกลมกลืนกว่าที่จะมองเห็น ');
  };

  const startGame = () => {
    setIsStarted(true);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800 text-white">
      <div className="text-center">
        {!isStarted ? (
          <div>
            <h1 className="text-4xl font-bold mb-6">Welcome! Ready to Play?</h1>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={startGame}
            >
              Press to Start
            </button>
          </div>
        ) : (
          <>
            <h1 className='text-gray-800'>ENG23 4041</h1>
            <h2 className="text-3xl font-semibold mb-4  text-white">Find Password This Page</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password is range 0,1"
                  required
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-sm text-blue-400 hover:underline"
                >
                  {showPassword ? 'Hide Password' : 'Show Password'}
                </button>
              </div>
              {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                Login
              </button>
            </form>

            <div className="mt-4">
              {hintMessage && <p className="text-yellow-400 text-sm mb-2">{hintMessage}</p>}
              <button
                onClick={handleHintRequest}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              >
                Need a Hint?
              </button>
            </div>

            {gameMessage && <div className="mt-4 text-green-400 font-semibold">{gameMessage}</div>}

            {fireworksVisible && (
              <div className="mt-4 animate-bounce">
                <div className="text-4xl">🎉🎉🎉</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
