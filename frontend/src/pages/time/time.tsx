import { message } from 'antd';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use for navigation to the next page

const CurrentTimePage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentMinute, setCurrentMinute] = useState<string>('');
  const [gameMessage, setGameMessage] = useState<string>('');
  const [encodedMessage, setEncodedMessage] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [hintMessage, setHintMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');

      setCurrentTime(`${hours}:${minutes}:${seconds}`);
      setCurrentMinute(minutes);

      const encoded = chifCypher("suranaree university of technology", parseInt(minutes));
      setEncodedMessage(encoded);
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const chifCypher = (text: string, key: number): string => {
    return text
      .split('')
      .map((char) => {
        if (char.match(/[a-zA-Z]/)) {
          const base = char === char.toUpperCase() ? 65 : 97;
          return String.fromCharCode(((char.charCodeAt(0) - base + key) % 26) + base);
        }
        return char;
      })
      .join('');
  };

  const handleHint = () => {
    setHintMessage("Hint:ในรูปมีอะไรและทุกนาทีมีค่า มีค่าจริงๆ.");
  };

  const handleSubmit = () => {
    if (userAnswer === encodedMessage.toLocaleUpperCase() || userAnswer === encodedMessage.toLocaleLowerCase()) {
      setErrorMessage('');
      setGameMessage('Correct answer! Redirecting to the next page 🎉🎉🎉');
      setTimeout(() => {
        navigate('/substitution'); // Redirect to the next page after 3 seconds
      }, 2000);
    } else {
      setErrorMessage('Incorrect answer. Please try again!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white" style={{height: "1000px"}}>
       <h1 className="text-4xl font-bold mb-6">Shift Cipher</h1>
      <div className="text-6xl font-mono">
        <span>{currentTime.split(':')[0]}</span>:
        <span className="text-red-500">{currentTime.split(':')[1]}</span>:
        <span>{currentTime.split(':')[2]}</span>
      </div>
      <p className="mt-4 text-lg">ใช้ชีวิตต้องเต็มที่เพราะ ทุกนาทีมีค่า</p>
      <div className="mt-6">
        <img src="src/assets/download.png" alt="Helpful visualization" className="mt-4 max-w-xs rounded" />
      </div>
      {gameMessage && <div className="mt-4 text-green-400 font-semibold text-xl">{gameMessage}</div>}
      <div className="mt-6 w-full max-w-md" style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded text-black"
          placeholder="Enter your encode"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        <button
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          onClick={handleSubmit}
        >
          Submit Answer
        </button>
        {errorMessage && <p className="mt-4 text-red-400">{errorMessage}</p>}
        <button
          className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
          onClick={handleHint}
        >
          Show Hint
        </button>
        {hintMessage && <p className="mt-4 text-yellow-400">{hintMessage}</p>}
      </div>
    </div>
  );
};

export default CurrentTimePage;
