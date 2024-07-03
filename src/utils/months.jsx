const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const MonthsList = () => {
  return (
    <div className="bg-gray-100 p-6 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Meses do Ano</h2>
        <ul className="list-disc list-inside">
          {months.map((month, index) => (
            <li key={index} className="mb-2">
              {month}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MonthsList;
