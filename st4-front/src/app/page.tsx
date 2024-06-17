'use client';
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
import { Slider, Sketch, Material, Colorful, Compact, Circle, Wheel, Block, Github, Chrome, HsvaColor } from '@uiw/react-color';
import { Alpha, Hue, ShadeSlider, Saturation, hsvaToHslaString } from '@uiw/react-color';
import { EditableInput, EditableInputRGBA, EditableInputHSLA } from '@uiw/react-color';
import Footer from "./footer";



export default function Home() {
  const [color, setColor] = useState('#fff');
  const [ledNumber, setLedNumber] = useState<number>(0);
  const [ledBrightness, setLedBrightness] = useState<number>(0);
  const [ledStatus, setLedStatus] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    hex = hex.replace(/^#/, '');

    // Parse the r, g, b values
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    let colorRGB = { r, g, b };

    return colorRGB;
  };

  const sendToAPI = async (color: string) => {
    console.log(color);
    let rbgColor = hexToRgb(color);
    console.log(rbgColor);
    try {
      const response = await fetch(`http://127.0.0.1:80/WebService/postWszystkieKolor?B=${rbgColor.b}&G=${rbgColor.g}&R=${rbgColor.r}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify(data),
      });

      console.log('Success');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sendToAPIWithLedNumber = async (color: string, ledNumber: number) => {
    console.log(color, ledNumber);
    let rbgColor = hexToRgb(color);
    console.log(rbgColor);
    try {
      const response = await fetch(`http://127.0.0.1:80/WebService/postKolor?numer=${ledNumber}&B=${rbgColor.b}&G=${rbgColor.g}&R=${rbgColor.r}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify(data),
      });

      console.log('Success');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sendBrightness = async (brightness: number) => {
    console.log(brightness);
    try {
      const response = await fetch(`http://127.0.0.1:80/WebService/postJasnosc?jasnosc=${brightness}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify(data),
      });

      console.log('Success');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const getStatus = async () => {
    try {
      const response = await fetch('http://127.0.0.1:80/WebService/getStan', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      console.log('Success:', result);
      setLedStatus(result.stan);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const setStatus = async (status: boolean) => {
    try {
      const response = await fetch(`http://127.0.0.1:80/WebService/postStan?stan=${status}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Success');
      setLedStatus(status);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getBrightness = async () => {
    try {
      const response = await fetch('http://127.0.0.1:80/WebService/getJasnosc', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      console.log('Success:', result);
      setLedBrightness(result.jasnosc);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getBrightness();
    const intervalId = setInterval(getBrightness, 4000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    getStatus();
    const intervalId = setInterval(getStatus, 4000);
    return () => clearInterval(intervalId);
  }, []);


  /*
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-orange-300 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto">
          <strong className="font-bold">🛑 Wystąpił błąd aplikacji: </strong>
          <span className="block sm:inline">{error.toString()}</span>
        </div>
      </div>
    );
  }*/

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-4">
        <h1 className="text-6xl font-bold">Led Color Picker!</h1>
      </div>
      <div className="mb-4">
        <p className="text-2xl mt-4">Jasność: {ledBrightness}% | Led Status: {ledStatus ? "włączone ✅" : "wyłączone 📛"}</p>
      </div>
      <div className="space-x-4 mb-4">
        <button
          onClick={() => setStatus(true)}
          className="bg-green-500 hover:bg-green-300 text-white font-bold py-2 px-4 rounded"
        >
          Włącz diody LED
        </button>
        <button
          onClick={() => setStatus(false)}
          className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded"
        >
          Wyłącz diody LED
        </button>
      </div>
      <div className="mb-4">
        <Sketch
          style={{ marginLeft: 20 }}
          color={color}
          onChange={(color) => {
            setColor(color.hex);
          }}
        />
      </div>
      <div className="mb-4">
        <button
          onClick={() => sendToAPI(color)}
          className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
        >
          Wyślij żądanie do wszystkich diod LED
        </button>
      </div>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Podaj numer diody LED"
          className="text-black bg-gray-200 border border-gray-300 p-2 rounded"
          min="0"
          onChange={(ledNumber) => { setLedNumber(Number(ledNumber.target.value)) }}
        />
      </div>
      <div className="mb-4">
        <button
          onClick={() => sendToAPIWithLedNumber(color, ledNumber)}
          className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
        >
          Wyślij żądanie do konkretnej diody LED
        </button>
      </div>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Podaj jasność (%) diod LED"
          className="text-black bg-gray-200 border border-gray-300 p-2 rounded"
          min="1"
          max="100"
          onChange={(brightness) => { setLedBrightness(Number(brightness.target.value)) }}
        />
      </div>
      <div className="mb-4">
        <button
          onClick={() => sendBrightness(ledBrightness)}
          className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
        >
          Wyślij żądanie zmiany jasności diod LED
        </button>
      </div>
      <Footer />
    </main>
  );
}
