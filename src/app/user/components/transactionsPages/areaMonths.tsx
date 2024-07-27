import React from "react";
import { FcPrevious, FcNext } from "react-icons/fc";
import { formatCurrentMonth } from "@/app/utils/boniak/dateFilter";

type Props = {
  currentMonth: string;
  onMonthChange: (newMonth: string) => void;
};

export default function AreaMonth({ currentMonth, onMonthChange }: Props) {
  const handlePrevMonth = () => {
    let [year, month] = currentMonth.split("-");
    let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    currentDate.setMonth(currentDate.getMonth() - 1);
    onMonthChange(
      `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}`
    );
  };

  const handleNextMonth = () => {
    let [year, month] = currentMonth.split("-");
    let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    currentDate.setMonth(currentDate.getMonth() + 1);
    onMonthChange(
      `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}`
    );
  };

  return (
    <div className="flex items-center justify-center space-x-5 p-4 bg-gray-100 rounded-lg shadow-md">
      <button
        onClick={handlePrevMonth}
        className="text-xl text-gray-500 hover:text-gray-700"
      >
        <FcPrevious />
      </button>
      <div className="text-lg font-semibold">
        {formatCurrentMonth(currentMonth)}
      </div>
      <button
        onClick={handleNextMonth}
        className="text-xl text-gray-500 hover:text-gray-700"
      >
        <FcNext />
      </button>
    </div>
  );
}
