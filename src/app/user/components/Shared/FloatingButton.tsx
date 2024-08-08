import Link from "next/link";
import React from "react";
import Draggable from "react-draggable";
import NewTransactionButton from "../NewTransactionButton";

const FloatingButton: React.FC = () => {
  return (
    <Draggable
      defaultPosition={{ x: 0, y: 0 }} // Posição inicial será ajustada pelo CSS
      bounds="body" // Limita o movimento dentro da área visível
    ></Draggable>
  );
};

export default FloatingButton;
