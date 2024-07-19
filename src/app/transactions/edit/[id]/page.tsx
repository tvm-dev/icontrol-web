"use client";

import EditTransactionForm from "@/app/components/transactionsPages/EditTransactionForm";
import { api } from "@/app/services/api";
import { useState, useEffect } from "react";

interface EditTransactionProps {
  params: {
    id: number;
    description: string;
    amount: number;
    date: string;
    type: number;
    payment: string;
    category: string;
    details: string;
    paid: boolean;
  };
}

export default function EditTransaction({ params }: EditTransactionProps) {
  const { id } = params;
  console.log(`console log tvm vindo de pages: ${id}`);
  return (
    <>
      <EditTransactionForm
        id={params.id}
        description={params.description}
        amount={params.amount}
        date={params.date}
        type={params.type}
        payment={params.payment}
        category={params.category}
        details={params.details}
        paid={params.paid}
      />
    </>
  );
}
