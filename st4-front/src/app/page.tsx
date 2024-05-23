'use client';
import Image from "next/image";
import { SetStateAction, useState } from "react";
import { Slider, Sketch, Material, Colorful, Compact, Circle, Wheel, Block, Github, Chrome, HsvaColor } from '@uiw/react-color';
import { Alpha, Hue, ShadeSlider, Saturation, hsvaToHslaString } from '@uiw/react-color';
import { EditableInput, EditableInputRGBA, EditableInputHSLA } from '@uiw/react-color';
import Footer from "./footer";



export default function Home() {
  const [color, setColor] = useState('#fff');
  const [error, setError] = useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    hex = hex.replace(/^#/, '');

    // Parse the r, g, b values
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return console.log(r, g, b);
  };

  const sendToAPI = async (color: string) => {
    console.log(color);
    hexToRgb(color);
  };
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
      <h1 className="text-6xl font-bold">Welcome to Led Color Picker!</h1>
      <Sketch
        style={{ marginLeft: 20 }}
        color={color}
        onChange={(color) => {
          setColor(color.hex);
        }}
      />
      <button
        onClick={() => sendToAPI(color)}
        className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
      >
        Send Color to API/LED
      </button>

      <Footer />
    </main>
  );
}
