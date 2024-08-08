// components/NewTransactionButton.tsx
"use client";

import { useState } from "react";
import NewTransactionModal from "./transactionsPages/NewTransactionModal";
import { MdFiberNew } from "react-icons/md";

const NewTransactionButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="flex justify-start">
        <button
          onClick={toggleModal}
          className="border-2 border-blue-500 p-2 mt-2 text-red text-sm rounded hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition duration-1000"
        >
          + Nova Transação
        </button>
      </div>
      {isModalOpen && <NewTransactionModal onClose={toggleModal} />}
    </>
  );
};

export default NewTransactionButton;
