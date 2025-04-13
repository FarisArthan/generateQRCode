"use client";

import { useState } from 'react';

// ข้อความในแต่ละภาษา
const translations = {
  th: {
    title: "สร้าง QR Code",
    placeholder: "พิมพ์ข้อความของคุณที่นี่",
    button: "สร้าง QR Code",
    scanMessage: "สแกนเพื่อดูข้อความ"
  },
  en: {
    title: "Create QR Code",
    placeholder: "Type your text here",
    button: "Generate QR Code",
    scanMessage: "Scan to see the message"
  },
  ja: {
    title: "QRコードを作成",
    placeholder: "ここにテキストを入力してください",
    button: "QRコードを生成",
    scanMessage: "メッセージを確認するにはスキャンしてください"
  },
  fr: {
    title: "Créer un QR Code",
    placeholder: "Entrez votre texte ici",
    button: "Générer un QR Code",
    scanMessage: "Scannez pour voir le message"
  },
  es: {
    title: "Crear QR Code",
    placeholder: "Escribe tu texto aquí",
    button: "Generar QR Code",
    scanMessage: "Escanea para ver el mensaje"
  },
  pt: {
    title: "Criar QR Code",
    placeholder: "Digite seu texto aqui",
    button: "Gerar QR Code",
    scanMessage: "Escaneie para ver a mensagem"
  }
};

export default function QRGenerator() {
  const [text, setText] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [language, setLanguage] = useState('th'); // Default to Thai

  const generateQRCode = async () => {
    try {
      const QRCode = require('qrcode');
      const url = await QRCode.toDataURL(text);
      setQrUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded shadow-md w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold">{translations[language].title}</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={translations[language].placeholder}
        className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
      />
      <button
        onClick={generateQRCode}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {translations[language].button}
      </button>
      
      <select
        value={language}
        onChange={handleLanguageChange}
        className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white mt-4"
      >
        <option value="th">ไทย</option>
        <option value="en">English</option>
        <option value="ja">日本語</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
        <option value="pt">Português</option>
      </select>

      {qrUrl && (
        <div className="mt-4">
          <img src={qrUrl} alt="QR Code" className="w-48 h-48" />
          <p className="text-sm text-black dark:text-white mt-2 text-center">{translations[language].scanMessage}</p>
        </div>
      )}
    </div>
  );
}
