import Link from "next/link";
import React from "react";
import Draggable from "react-draggable";

const FloatingButton: React.FC = () => {
  return (
    <Draggable
      defaultPosition={{ x: 0, y: 0 }} // Posição inicial será ajustada pelo CSS
      bounds="body" // Limita o movimento dentro da área visível
    >
      <div className="fixed bottom-8 right-8 z-50">
        <Link href="/transactions/create">
          <button
            className="bg-blue-500 text-white w-16 h-16 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center text-3xl leading-tight"
            aria-label="Criar Nova Transação"
          >
            +
          </button>
        </Link>
      </div>
    </Draggable>
  );
};

export default FloatingButton;
