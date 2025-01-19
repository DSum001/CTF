import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import './symetric.css';

const SymmetricEncryptionPage: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [hashedPassword, setHashedPassword] = useState<string>('');
  const [encryptedMessage, setEncryptedMessage] = useState<string>('');
  const [decryptedMessage, setDecryptedMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isEncrypted, setIsEncrypted] = useState<boolean>(false);

  // Secret message to encrypt
  const secretMessage = "Welcome to the Symmetric Encryption Game!";
  
  // Hash the password input using SHA-256
  const handleHashPassword = () => {
    if (password === '') {
      setErrorMessage('Please enter a password!');
      return;
    }

    // Hash password using SHA-256
    const hashed = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
    setHashedPassword(hashed);
    setErrorMessage('');
  };

  // Encrypt the message using the hashed password
  const handleEncrypt = () => {
    if (hashedPassword === '') {
      setErrorMessage('Please hash the password before encrypting!');
      return;
    }

    const encrypted = CryptoJS.AES.encrypt(secretMessage, hashedPassword).toString();
    setEncryptedMessage(encrypted);
    setDecryptedMessage('');
    setIsEncrypted(true);
    setErrorMessage('');
  };

  // Decrypt the message using the hashed password
  const handleDecrypt = () => {
    if (hashedPassword === '') {
      setErrorMessage('Please hash the password before decrypting!');
      return;
    }

    const bytes = CryptoJS.AES.decrypt(encryptedMessage, hashedPassword);
    const originalMessage = bytes.toString(CryptoJS.enc.Utf8);

    if (originalMessage === secretMessage) {
      setDecryptedMessage(originalMessage);
      setErrorMessage('');
    } else {
      setErrorMessage('Failed to decrypt the message. Check the password!');
      setDecryptedMessage('');
    }
  };

  return (
    <div className="encryption-container">
      <h2>Symmetric Encryption Game</h2>

      <p>Hash your password and use it to encrypt/decrypt the secret message!</p>

      <div className="input-section">
        {/* Input for password */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="input-field"
        />
        <button onClick={handleHashPassword} className="action-btn">
          Hash Password
        </button>
      </div>

      {/* Display the hashed password */}
      {hashedPassword && (
        <div>
          <h3>Your Hashed Password:</h3>
          <textarea readOnly value={hashedPassword} className="result-field" />
        </div>
      )}

      <div className="button-section">
        <button onClick={handleEncrypt} className="action-btn" disabled={!hashedPassword}>
          Encrypt Secret Message
        </button>
        <button onClick={handleDecrypt} className="action-btn" disabled={!isEncrypted}>
          Try to Decrypt
        </button>
      </div>

      {/* Show error message */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Show the encrypted message */}
      {isEncrypted && (
        <div className="result-section">
          <h3>Encrypted Message:</h3>
          <textarea readOnly value={encryptedMessage} className="result-field" />
        </div>
      )}

      {/* Show decrypted message */}
      {decryptedMessage && (
        <div className="result-section">
          <h3>Decrypted Message:</h3>
          <textarea readOnly value={decryptedMessage} className="result-field" />
        </div>
      )}
    </div>
  );
};

export default SymmetricEncryptionPage;
