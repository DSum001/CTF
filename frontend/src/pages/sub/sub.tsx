import { useState } from "react";
import { KeyRound, HelpCircle } from "lucide-react";
import pic from "../../assets/CTF158.jpg";

function Substitution() {
  const [showHint, setShowHint] = useState(false);
  const [solved, setSolved] = useState(false);
  const [answer, setAnswer] = useState(""); // Added state for answer
  const [errorMessage, setErrorMessage] = useState(""); // Added state for error message

  const alphabet = "NDFY*LXSC*PMIB*WVEJ*GHZ*UQ";
  const challengeFlag = "SUT{y0u_f0u4d_th3_s3cr3t}";

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
    <div className="min-h-screen bg-white p-10 flex flex-col items-center">
      <section className="bg-gray-800 p-4 rounded-lg mb-6 w-full max-w-2xl">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => setShowHint(!showHint)}
            className="bg-transparent p-0 border-none hover:bg-white ml-auto"
          >
            <HelpCircle className="w-8 h-8 text-yellow-400" />
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-2 text-zinc-300 text-left">
          โจทย์ปัญหา:
        </h2>
        <p className="text-gray-300">
          <span className="px-2">
            หา alphabet ให้ครบก่อนถอดรหัส โดยคำซ่อนอยู่ในรูป ลองมองไปที่รูป
            แล้วคิดตื้น ๆ ถ้าคิดได้แล้วโหลดไฟล์เพื่อถอดรหัสได้เลยยย
          </span>

          <a
            href="./message.txt"
            download="message.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            โหลดไฟล์ที่นี่
          </a>
        </p>

        {showHint && (
          <>
            <div className="bg-[#2d2d2d] border-l-4 border-[#2196f3] p-4 rounded">
              <p className="text-gray-300">
                <span className="text-[#2196f3] font-semibold">คำใบ้:</span> มทส
                อยู่ในจังหวัด?
              </p>

              <p className="text-gray-300">
                <span className="text-[#2196f3] font-semibold">ตัวช่วย:</span>{" "}
                <a
                  href="https://quipqiup.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  แนะนำเว็บถอดรหัส
                </a>
              </p>
            </div>
          </>
        )}

        {solved && (
          <div className="mt-4 p-4 bg-green-600 rounded-lg">
            🎉 Congratulations! You've found the flag: {challengeFlag}
          </div>
        )}
      </section>

      <section className="grid gap-6 w-full max-w-2xl">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-center mb-4 px-20">
            <label className="font-semibold text-lg text-white">
              Alphabet:
            </label>
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
    <div className="flex items-center gap-4">
      <h2 className="text-xl font-semibold text-white">Answer:</h2>
      <input
  type="text"
  value={answer}
  onChange={handleAnswerChange}
  className="w-96 bg-gray-700 p-2 rounded font-mono text-lg text-gray-200"
  placeholder="Format: SUT{***_*****_***_******}"
/>

      <button
        onClick={checkAnswer}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
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
