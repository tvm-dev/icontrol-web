export default function Header() {
  return (
    <>
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">
            <a href="/"> iControl</a>
          </div>
          <ul className="flex space-x-4">
            <li>
              <a
                href="/dashboard"
                className="bg-green-500 text-white  hover:text-gray-200 hover:bg-green-900 p-2 transition duration-500 rounded "
              >
                Dash
              </a>
            </li>

            <li>
              <a
                href="/transactions"
                className="bg-green-500 text-white  hover:text-gray-200 hover:bg-green-900 p-2 transition duration-500 rounded "
              >
                Transações
              </a>
            </li>

            <li>
              <a
                href="transactions/create"
                className="bg-green-500 text-white  hover:text-gray-200 hover:bg-green-900 p-2 transition duration-500 rounded "
              >
                Criar Transação
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
