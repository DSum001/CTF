import { useState } from "react";
import { KeyRound, HelpCircle } from "lucide-react";
import pic from "../../assets/CTF158.jpg";

function Substitution() {
  const [showHint, setShowHint] = useState(false);
  const [solved, setSolved] = useState(false);
  const [answer, setAnswer] = useState(""); // Added state for answer
  const [errorMessage, setErrorMessage] = useState(""); // Added state for error message

  const alphabet = "NDFY*LXSC*PMIB*WVEJ*GHZ*UQ";
  const challengeFlag = "SUT{y0u_f0und_th3_s3cr3t}";

  const handleAnswerChange = (e: any) => {
    setAnswer(e.target.value); // Update the answer state when user types
    setErrorMessage(""); // Reset error message whenever the user starts typing
  };

  const checkAnswer = () => {
    if (answer === challengeFlag) {
      setSolved(true); // Set solved to true if the answer is correct
      setErrorMessage(""); // Clear error message if the answer is correct
    } else {
      setErrorMessage("Incorrect answer. Please try again!"); // Display error message if the answer is incorrect
      setSolved(false); // Set solved to false if the answer is incorrect
    }
  };

  return (
    <div className="min-h-screen bg-white p-10">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 flex-1">
          <KeyRound className="w-10 h-10 text-yellow-400" />
          <h1 className="text-3xl font-bold text-blue-600">
            Substitution Cipher Challenge
          </h1>
        </div>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setShowHint(!showHint)}
            className="bg-transparent p-0 border-none hover:bg-white"
          >
            <HelpCircle className="w-8 h-8 text-yellow-400" />
          </button>
        </div>
      </header>

      <section className="bg-gray-800 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2 text-zinc-300 text-left">
          โจทย์ปัญหา:
        </h2>
        <p className="text-gray-300">
          เอ๊ะ! วันนี้ฉันจำได้ว่าฉันมีสอบวิชา Cyber Security
          แต่ก่อนจะเข้าห้องสอบได้นั้นต้องผ่านประตูที่มีรหัสผ่านโดยมันถูกเข้ารหัสด้วยวิธี
          Substitution Cipher แต่ฉันพึ่งเรียนวิชา Computer Communication
          นี่ก็สายมากแล้ว ฉันต้องทำยังไงเพื่อจะเข้าห้องทันเวลากันนะ!!!???
          โหลดไฟล์ที่นี่
        </p>

        {showHint && (
          <div className="mt-4 p-4 bg-gray-700 rounded-lg">
            <p className="text-gray-300">มทส อยู่ในจังหวัด?</p>
          </div>
        )}
        {solved && (
          <div className="mt-4 p-4 bg-green-600 rounded-lg">
            🎉 Congratulations! You've found the flag: {challengeFlag}
          </div>
        )}
      </section>

      <section className="grid gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-center mb-4 px-20">
            <label className="font-semibold text-lg">Alphabet:</label>
            <span className="font-bold text-xl text-yellow-500 ml-2">
              {alphabet}
            </span>
          </div>

          <div className="flex justify-center mb-4">
            <div className="mt-4 w-full max-w-sm">
              {pic && (
                <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={pic}
                    alt="uploaded"
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-left text-white">
              Answer:
            </h2>
            <input
              type="text"
              value={answer}
              onChange={handleAnswerChange}
              className="w-full bg-gray-700 p-4 rounded font-mono text-lg text-gray-200"
              placeholder="Format flag: SUT{****_****_****}"
            />
            <button
              onClick={checkAnswer}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit Answer
            </button>
            {errorMessage && (
              <div className="mt-4 text-red-500 text-lg">{errorMessage}</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Substitution;
