import React from "react";
import type { Animal } from "../types";

interface SpiritAnimalSelectorProps {
  onSelect: (animal: Animal) => void;
}

// Spirit animals with cute emojis
const spiritAnimals: Animal[] = [
  { id: '1', name: "Wise Owl", icon: "🦉" },
  { id: '2', name: "Brave Lion", icon: "🦁" },
  { id: '3', name: "Clever Fox", icon: "🦊" },
  { id: '4', name: "Swift Eagle", icon: "🦅" },
  { id: '5', name: "Gentle Deer", icon: "🦌" },
  { id: '6', name: "Playful Dolphin", icon: "🐬" },
  { id: '7', name: "Strong Bear", icon: "🐻" },
  { id: '8', name: "Free Butterfly", icon: "🦋" },
  { id: '9', name: "Happy Panda", icon: "🐼" },
  { id: '10', name: "Curious Koala", icon: "🐨" },
  { id: '11', name: "Loyal Puppy", icon: "🐶" },
  { id: '12', name: "Cozy Cat", icon: "🐱" },
  { id: '13', name: "Bouncy Bunny", icon: "🐰" },
  { id: '14', name: "Cheerful Penguin", icon: "🐧" },
  { id: '15', name: "Tiny Hamster", icon: "🐹" },
  { id: '16', name: "Fluffy Chick", icon: "🐣" },
];

const AnimalCard: React.FC<{ animal: Animal; onClick: () => void }> = ({
  animal,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-all duration-300 ease-in-out border border-purple-500/30 hover:bg-gray-700/50 hover:border-purple-500 flex flex-col items-center justify-center"
      style={{ aspectRatio: '1 / 1' }}
    >
      <span
        className="text-5xl sm:text-6xl mb-4"
        role="img"
        aria-label={`${animal.name} emoji`}
      >
        {animal.icon}
      </span>
      <h3 className="text-base sm:text-xl font-bold text-white tracking-wide leading-tight">
        {animal.name}
      </h3>
    </button>
  );
};

export default function SpiritAnimalSelector({
  onSelect,
}: SpiritAnimalSelectorProps) {
  return (
    <div className="p-4 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
        Choose Your Spirit Animal
      </h2>
      <p className="text-lg text-center text-gray-300 mb-10">
        Pick the animal that speaks to your soul and start your vocabulary
        journey! 🌟
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {spiritAnimals.map((animal) => (
          <AnimalCard
            key={animal.id}
            animal={animal}
            onClick={() => onSelect(animal)}
          />
        ))}
      </div>
    </div>
  );
}
