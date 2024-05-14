'use client';
import Image from "next/image";
import { SetStateAction, useState } from "react";
import { ChromePicker, PhotoshopPicker } from 'react-color';



export default function Home() {
  const [color, setColor] = useState('#fff');
  const [error, setError] = useState<string | null>(null);
  const handleChangeComplete = async (color: { hex: SetStateAction<string>; }) => {
    setColor(color.hex);
    console.log(color.hex);
    //send to api
    try {
      const response = await fetch('http://localhost:3000/api/color', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ color: color.hex }),
      });
    } catch (error) {
      console.error('Error fetching data: ', error);
      setError(`Error fetching data: ${error}`);
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-orange-300 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto">
          <strong className="font-bold">🛑 Wystąpił błąd aplikacji: </strong>
          <span className="block sm:inline">{error.toString()}</span>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Welcome to ST4!</h1>
      <div className="color-picker-container">
        <h1>Pick a Color</h1>
        <ChromePicker
          color={color}
          onChangeComplete={handleChangeComplete}
        />
      </div>
    </main>
  );
}
