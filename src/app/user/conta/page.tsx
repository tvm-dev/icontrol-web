import Head from "next/head";
import Link from "next/link";

export default function Account() {
  return (
    <>
      <Head>
        <title>iControl: pq vc controla sua grana!</title>
      </Head>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
          <h1 className="text-4xl font-bold text-blue-600">iControl</h1>
          <p className="font-thin">Porque você controla sua GRANA!</p>
          <hr className="my-4" />
          <h1 className="mt-2 text-xl font-bold text-blue-600 mb-6">
            Bem-vindo ao seu App de Controle Financeiro
          </h1>
          <p className="text-md text-gray-700 mb-6">
            Controle suas finanças pessoais de forma simples e eficiente.
            Acompanhe suas transações, categorize seus gastos e visualize seu
            saldo a qualquer momento.
          </p>
          <div className="space-y-4">
            <Link href="/login">
              <button className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150">
                Entrar
              </button>
            </Link>
            <span className="font-thin">ou</span>
            <Link href="/register">
              <button className="w-full py-2 px-4 bg-green-600 text-white font-bold rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150">
                Criar Conta
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
