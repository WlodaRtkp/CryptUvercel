import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

const VigenereCipher = () => {
  const [operation, setOperation] = useState('');
  const [key, setKey] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const vigenereEncrypt = (plainText, key) => {
    let encryptedText = '';
    const keyRepeated = (key.repeat(Math.ceil(plainText.length / key.length))).slice(0, plainText.length);
    
    for (let i = 0; i < plainText.length; i++) {
      if (plainText[i].match(/[a-zA-Z]/)) {
        const shift = keyRepeated[i].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
        if (plainText[i].match(/[A-Z]/)) {
          encryptedText += String.fromCharCode(((plainText[i].charCodeAt(0) + shift - 65) % 26) + 65);
        } else {
          encryptedText += String.fromCharCode(((plainText[i].charCodeAt(0) + shift - 97) % 26) + 97);
        }
      } else {
        encryptedText += plainText[i];
      }
    }
    return encryptedText;
  };

  const vigenereDecrypt = (cipherText, key) => {
    let decryptedText = '';
    const keyRepeated = (key.repeat(Math.ceil(cipherText.length / key.length))).slice(0, cipherText.length);
    
    for (let i = 0; i < cipherText.length; i++) {
      if (cipherText[i].match(/[a-zA-Z]/)) {
        const shift = keyRepeated[i].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
        if (cipherText[i].match(/[A-Z]/)) {
          decryptedText += String.fromCharCode(((cipherText[i].charCodeAt(0) - shift - 65 + 26) % 26) + 65);
        } else {
          decryptedText += String.fromCharCode(((cipherText[i].charCodeAt(0) - shift - 97 + 26) % 26) + 97);
        }
      } else {
        decryptedText += cipherText[i];
      }
    }
    return decryptedText;
  };

  const handleSubmit = () => {
    if (!operation || !key || !message) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!key.match(/^[a-zA-Z]+$/)) {
      setError('Key must contain only letters');
      return;
    }

    setError('');
    
    if (operation === 'E') {
      const cipherText = vigenereEncrypt(message, key);
      setResult(`Ciphertext: ${cipherText}`);
    } else {
      const decryptedText = vigenereDecrypt(message, key);
      setResult(`Decrypted text: ${decryptedText}`);
    }
  };

  const handleReset = () => {
    setOperation('');
    setKey('');
    setMessage('');
    setResult('');
    setError('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">CryptU</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button 
              className={`flex-1 ${operation === 'E' ? 'bg-blue-600' : 'bg-gray-500'}`}
              onClick={() => setOperation('E')}
            >
              Encrypt
            </Button>
            <Button 
              className={`flex-1 ${operation === 'D' ? 'bg-blue-600' : 'bg-gray-500'}`}
              onClick={() => setOperation('D')}
            >
              Decrypt
            </Button>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Key:</label>
            <Input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter key"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Message:</label>
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <div className="p-4 bg-gray-100 rounded-md">
              <p className="break-all">{result}</p>
            </div>
          )}

          <div className="space-y-2">
            <Button 
              className="w-full bg-green-600"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button 
              className="w-full bg-gray-500"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VigenereCipher;
