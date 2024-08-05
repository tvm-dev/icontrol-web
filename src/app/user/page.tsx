// src/app/user/page.tsx
import Head from "next/head";
import React from "react";

const UserPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Título da Página tvm</title>
        <meta name="description tvm" content="Descrição da Página tvm" />
      </Head>
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        Página do Usuário x
      </div>
    </>
  );
};

export default UserPage;
