import React, { useState } from "react";
import CryptoJS from "crypto-js";
import "./hash.css";

const CTFHashChallenge: React.FC = () => {
    // Hash เป้าหมายที่กำหนดไว้ (ตัวอย่าง: MD5 ของ "ilovecyber")
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
            setResultMessage("🎉 Correct! The plaintext is: " + inputValue.trim());
        } else {
            setResultMessage("❌ Incorrect! Try again.");
        }
    };

    // แสดงคำใบ้
    const handleShowHint = () => {
        setShowHint(true);
        setHintUsed(true);
    };

    // แสดงเฉพาะส่วนของ targetHash โดยซ่อนเลข 9
    const targetHashDisplay = targetHash.replace(/5/g, "*"); // แทนที่เลข 9 ด้วยเครื่องหมาย *

    return (
        <div className="ctf-container">
            <h2>CTF Challenge: Find the Plaintext</h2>
            <p>
            นำค่าที่ได้จากรูปภาพไปแทนที่ใน * เพื่อนำค่าhash ไปหาplaintext 
                <br />
                (ใช้เว็บไซต์ภายนอกเพื่อหาคำตอบได้)
                <br />
                <code>{targetHashDisplay}</code>

            </p>

            {/* เพิ่มรูปภาพที่ต้องการ */}
            <div className="image-container">
                <img src="https://file.baanbaan.co/story/o/637937292077076776-IMG_8766.jpg" alt="Image 1" className="ctf-image" />
                <img src="https://sutgateway.sut.ac.th/admissions2021/wp-content/uploads/2021/08/DSCF8747.jpg" alt="Image 2" className="ctf-image" />
            </div>


            {/* ช่องป้อนข้อความ */}
            <div className="input-section">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter your plaintext"
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>

            {/* ปุ่มสำหรับแสดงคำใบ้ */}
            {!showHint && (
                <button onClick={handleShowHint} className="hint-btn">
                    Get a Hint 
                </button>
            )}

            {/* แสดงคำใบ้ */}
            {showHint && (
                <div className="hint-section">
                    <h3>Hint(รูปภาพ):</h3>
                    <p>
                        ศูนย์ไม่มีความหมาย
                        <br />
                        ลองใช้เครื่องมือถอดรหัสออนไลน์ เช่น 
                        <a href="https://crackstation.net/" target="_blank" rel="noopener noreferrer">
                            CrackStation.net
                        </a>
                    </p>
                </div>
            )}

            {/* แสดงผลลัพธ์ */}
            {resultMessage && <p className="result-message">{resultMessage}</p>}
        </div>
    );
};

export default CTFHashChallenge;
