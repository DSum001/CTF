import { useState } from "react";
import { AlertCircle, CheckCircle2, HelpCircle, X } from "lucide-react";

const Symmetric = () => {
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [hintVisible, setHintVisible] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
    setMessage("");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    if (inputValue === "21") {
      setMessage("🎉 Congratulations! You've successfully cracked the code!");
      setCorrectAnswer(true);
    } else {
      setMessage("❌ Incorrect code. Keep trying!");
      setCorrectAnswer(false);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
    
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 to-gray-900 p-6">
      <div
        className={`relative w-full max-w-md transform transition-all duration-500 ${
          correctAnswer
            ? "scale-105 bg-gradient-to-br from-emerald-700 to-teal-900"
            : "bg-gradient-to-br from-slate-900 to-slate-800"
        } rounded-3xl shadow-2xl p-8 border-2 ${
          correctAnswer ? "border-emerald-400" : "border-slate-700"
        }`}
      >
        {/* Hint Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setHintVisible(!hintVisible)}
            className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-slate-700 hover:bg-slate-600 transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <HelpCircle className="w-6 h-6 text-emerald-300" />
            <span className="absolute invisible group-hover:visible -top-14 right-0 w-32 bg-slate-800 text-emerald-300 text-sm rounded-lg py-2 px-3 shadow-xl">
              {hintVisible ? "Hide Hint" : "Show Hint"}
            </span>
          </button>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-8 text-center tracking-tight">
          <span className="text-emerald-400">Challenge</span>
        </h1>

        {/* Hint Panel */}
        {hintVisible && (
          <div className="mb-8 transform transition-all duration-300 ease-in-out">
            <div className="p-5 bg-slate-800 rounded-xl border-l-4 border-emerald-400 shadow-lg">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                <p className="text-emerald-200 font-medium text-lg">
                  คำตอบคือตัวเลขอะไรน้าาา 🤔
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Encrypted Message */}
        <div className="mb-8 text-center space-y-3 bg-slate-800 p-6 rounded-xl shadow-inner">
          <h2 className="text-3xl font-bold text-white mb-6">Decrypt the Message</h2>
          <div className="font-mono text-2xl font-bold tracking-wider space-y-3">
            {["GPIKPGGTKPI", "HTRUZYJW", "YAXGTGXKK", "KGJMZ AMKCZQBG"].map((line, index) => (
              <p
                key={index}
                className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400"
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter your answer here..."
              className={`w-full p-4 text-lg rounded-xl bg-slate-700 text-emerald-300 placeholder-slate-400 border-2 ${
                isShaking ? "animate-shake" : ""
              } ${
                correctAnswer
                  ? "border-emerald-400 focus:border-emerald-300"
                  : "border-slate-600 focus:border-emerald-500"
              } outline-none transition-all duration-300 shadow-inner`}
            />
          </div>

          <button
            type="submit"
            className="w-full p-4 rounded-xl text-lg font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-800 shadow-lg"
          >
            Submit Answer
          </button>
        </form>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 backdrop-blur-sm">
            <div className="bg-slate-800 p-8 rounded-2xl w-96 border-2 border-slate-700 shadow-2xl transform transition-all duration-300 scale-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  {correctAnswer ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  )}
                  {correctAnswer ? "Great Job!" : "Keep Trying!"}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-slate-400 hover:text-white transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="mt-4">
                <p className={`text-lg ${correctAnswer ? "text-emerald-400" : "text-red-400"}`}>
                  {message}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="mt-6 w-full p-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-colors duration-200 font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Symmetric;