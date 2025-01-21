import React, { useState } from 'react';
import { Button, Input, Typography, Space, Row, Col, message, Card, Alert } from 'antd';
import { LockOutlined, UnlockOutlined, KeyOutlined } from '@ant-design/icons';
import './symetric.css';

const { Title, Text } = Typography;

const Symmetric = () => {
  const [shift, setShift] = useState(3); // ค่าการเลื่อนเริ่มต้น
  const [messageToEncrypt, setMessageToEncrypt] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(false);

  const encryptMessage = (message: string, shift: number): string => {
    let result = '';
    for (let i = 0; i < message.length; i++) {
      let char = message[i];
      if (char.match(/[a-zA-Z]/)) {
        const charCode = message.charCodeAt(i);
        const shiftBase = char.toLowerCase() === char ? 97 : 65;
        result += String.fromCharCode(((charCode - shiftBase + shift) % 26) + shiftBase);
      } else {
        result += char;
      }
    }
    return result;
  };

  const decryptMessage = (message: string, shift: number): string => {
    let result = '';
    for (let i = 0; i < message.length; i++) {
      let char = message[i];
      if (char.match(/[a-zA-Z]/)) {
        const charCode = message.charCodeAt(i);
        const shiftBase = char.toLowerCase() === char ? 97 : 65;
        result += String.fromCharCode(((charCode - shiftBase - shift + 26) % 26) + shiftBase);
      } else {
        result += char;
      }
    }
    return result;
  };

  // ฟังก์ชันในการจัดการการเข้ารหัส
  const handleEncrypt = () => {
    if (messageToEncrypt) {
      const encrypted = encryptMessage(messageToEncrypt, shift);
      setEncryptedMessage(encrypted);
      setError(false);
    } else {
      message.error('กรุณากรอกข้อความที่ต้องการเข้ารหัส');
    }
  };

  // ฟังก์ชันในการจัดการการถอดรหัส
  const handleDecrypt = () => {
    // Decrypt the encrypted message
    const decrypted = decryptMessage(encryptedMessage, shift);
    
    if (userInput === decrypted) {
      message.success('ยินดีด้วย! คุณถอดรหัสได้ถูกต้อง');
    } else {
      setError(true);
      message.error('ข้อความที่ถอดรหัสไม่ถูกต้อง');
    }
  };

  // ฟังก์ชันในการแสดงการเดา
  const handleGenerateFlag = () => {
    const randomMessage = 'This is a secret message'; // ข้อความที่ต้องการให้เดา
    const encryptedFlag = encryptMessage(randomMessage, shift);
    setEncryptedMessage(encryptedFlag);
    setDecryptedMessage(randomMessage);
  };

  return (
    <div className="symmetric-container">
      <Row justify="center" style={{ marginBottom: 20 }}>
        <Col span={12}>
          <Card title="CTF - Shift Cipher" bordered={false}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Title level={3}>เข้ารหัสข้อความ</Title>
              <Input
                placeholder="กรอกข้อความที่จะเข้ารหัส"
                value={messageToEncrypt}
                onChange={(e) => setMessageToEncrypt(e.target.value)}
                style={{ marginBottom: 10 }}
              />
              <Button
                type="primary"
                icon={<LockOutlined />}
                onClick={handleEncrypt}
                block
              >
                เข้ารหัสข้อความ
              </Button>

              {encryptedMessage && (
                <div style={{ marginTop: 20 }}>
                  <Alert
                    message="ข้อความที่เข้ารหัส"
                    description={encryptedMessage}
                    type="success"
                    showIcon
                  />
                </div>
              )}

              <Title level={4} style={{ marginTop: 20 }}>
                ถอดรหัสข้อความ
              </Title>
              <Input
                placeholder="กรอกข้อความที่ถอดรหัส"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                style={{ marginBottom: 10 }}
              />
              <Button
                type="primary"
                icon={<UnlockOutlined />}
                onClick={handleDecrypt}
                block
              >
                ถอดรหัสข้อความ
              </Button>

              {error && (
                <Text type="danger" style={{ marginTop: 10 }}>
                  ข้อความไม่ถูกต้อง กรุณาลองใหม่
                </Text>
              )}
              <Button
                type="dashed"
                icon={<KeyOutlined />}
                onClick={handleGenerateFlag}
                style={{ marginTop: 20 }}
                block
              >
                สร้าง Flag ใหม่
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Symmetric;
