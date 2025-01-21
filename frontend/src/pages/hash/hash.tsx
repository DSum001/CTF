import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./hash.css";

const CTFHashChallenge: React.FC = () => {
    const navigate = useNavigate(); // ใช้สำหรับการเปลี่ยนหน้า

    const targetHash = "d0d90090204b44d47d516f835538d5fe";

    const [inputValue, setInputValue] = useState<string>(""); // ข้อความที่ผู้เล่นป้อน
    const [resultMessage, setResultMessage] = useState<string>(""); // ข้อความแสดงผลลัพธ์
    const [hintUsed, setHintUsed] = useState<boolean>(false); // ตรวจสอบว่ามีการใช้คำใบ้หรือยัง
    const [showHint, setShowHint] = useState<boolean>(false); // แสดง/ซ่อนคำใบ้

    // ตรวจสอบคำตอบของผู้เล่น
    const handleSubmit = () => {
        if (!inputValue.trim()) {
            setResultMessage("Please enter a value to check!");
            return;
        }

        // สร้าง Hash ของข้อความที่ป้อน
        const userHash = CryptoJS.MD5(inputValue.trim()).toString();

        if (userHash === targetHash) {
            setResultMessage("🎉 Correct! Redirecting to the next challenge...");
            setTimeout(() => {
                navigate("/time"); // เปลี่ยนหน้าไปยัง /time หลังจาก 2 วินาที
            }, 2000);
        } else {
            setResultMessage("❌ Incorrect! Try again.");
        }
    };

    const handleShowHint = () => {
        setShowHint(true);
        setHintUsed(true);
    };

    const targetHashDisplay = targetHash.replace(/5/g, "*");

    return (
        <div className="ctf-container">
            <h2>CTF Challenge: Find the Plaintext</h2>
            <p>
                นำค่าที่ได้จากรูปภาพไปแทนที่ใน * เพื่อนำค่า hash ไปหา plaintext 
                <br />
                (ใช้เว็บไซต์ภายนอกเพื่อหาคำตอบได้)
                <br />
                <code>{targetHashDisplay}</code>
            </p>

            <div className="image-container">
                <img src="https://file.baanbaan.co/story/o/637937292077076776-IMG_8766.jpg" alt="Image 1" className="ctf-image" />
                <img src="https://sutgateway.sut.ac.th/admissions2021/wp-content/uploads/2021/08/DSCF8747.jpg" alt="Image 2" className="ctf-image" />
            </div>

            <div className="input-section">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter your plaintext"
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>

            {!showHint && (
                <button onClick={handleShowHint} className="hint-btn">
                    Get a Hint 
                </button>
            )}

            {showHint && (
                <div className="hint-section">
                    <h3>Hint (รูปภาพ):</h3>
                    <p>
                        ศูนย์ไม่มีความหมาย
                        <br />
                        ลองใช้เครื่องมือถอดรหัสออนไลน์ เช่น{" "}
                        <a href="https://crackstation.net/" target="_blank" rel="noopener noreferrer">
                            CrackStation.net
                        </a>
                    </p>
                </div>
            )}

            {resultMessage && <p className="result-message">{resultMessage}</p>}
        </div>
    );
};

export default CTFHashChallenge;
