import { FcPrevious, FcNext } from "react-icons/fc";
import { formatCurrentMonth, getCurrentMonth } from "@/utils/boniak/dateFilter";
import { AreaBalanceMonth } from "./areaBalanceMonths";

type Props = {
  currentMonth: string;
  onMonthChange: (newMonth: string) => void;
  balance: number;
  incomes: number;
  expenses: number;
  investments: number;
};

export default function AreaMonth({
  currentMonth,
  onMonthChange,
  balance,
  incomes,
  expenses,
  investments,
}: Props) {
  //Last Month:
  const handlePrevMonth = () => {
    let [year, month] = currentMonth.split("-");
    let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    currentDate.setMonth(currentDate.getMonth() - 1);
    onMonthChange(
      ` ${currentDate.getFullYear()} - ${currentDate.getMonth() + 1} `
    );
  };

  //Next Month:
  const handleNextMonth = () => {
    let [year, month] = currentMonth.split("-");
    let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    currentDate.setMonth(currentDate.getMonth() + 1);
    onMonthChange(
      ` ${currentDate.getFullYear()} - ${currentDate.getMonth() + 1} `
    );
  };

  return (
    <>
      <div className="flex justify-center p-2 space-x-10  ">
        <FcPrevious
          size="2rem"
          color="goldenrod"
          className="custom-icon hover:bg-black duration-900 transition-all rounded"
          title="Mês Anterior"
          aria-label="Last Month icon"
          cursor="pointer"
          onClick={handlePrevMonth}
        />

        <h1 className="text-2xl ">{formatCurrentMonth(currentMonth)}</h1>

        <FcNext
          size="2rem"
          color="goldenrod"
          className="custom-icon hover:bg-black duration-500 tra  nsition-all rounded"
          title="Próximo Mês"
          aria-label="Next Month icon"
          cursor="pointer"
          onClick={handleNextMonth}
        />
      </div>
    </>
  );
}
