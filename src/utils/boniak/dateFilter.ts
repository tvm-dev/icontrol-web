'use client'

export type Transactions = {
    paid: any;
    id: string;
    description: string;
    amount: number;
    date: string; // Mudei para string, já que está vindo como string
    type: string;
    category: string;
    month: string;
    payment: string;
    details: string;
    

};

// export const getCurrentMonth = (): string => {
//     let now = new Date();
//     return `${now.getFullYear()}-${now.getMonth() + 1}`; // Mês começa em 0 no JS.
// };

export const getCurrentMonth = (): string => {
    let now = new Date();
    now.setHours(now.getHours() - 3); // Subtrai 3 horas
    return `${now.getFullYear()}-${now.getMonth() + 1}`; // Mês começa em 0 no JS.
};


export const filterTransactionsByMonth = (transactions: Transactions[], date: string): Transactions[] => {
    let newListTransaction: Transactions[] = [];
    let [year, month] = date.split('-').map(Number);

    for (let transaction of transactions) {
        const transactionDate = parseDate(transaction.date);

        // Verifica se a transação está dentro do mês correto
        if (
            transactionDate.getUTCFullYear() === year &&
            transactionDate.getUTCMonth() + 1 === month
        ) {
            newListTransaction.push(transaction);
        }
    }

    return newListTransaction;
};
  




export const formatCurrentMonth = (currentMonth: string): string => {
    let [year, month] = currentMonth.split('-');
    let allMonths = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    return ` ${allMonths[parseInt(month) - 1]} de ${year}`;
}


// Em utils/boniak/dateFilter.ts

export const formatDateBr = (date: Date): string => {
    const day = addZeroToDate(date.getUTCDate()); // Use getUTCDate
    const month = addZeroToDate(date.getUTCMonth() + 1); // Use getUTCMonth
    const year = date.getUTCFullYear(); // Use getUTCFullYear
    const weekday = getWeekdayName(date.getUTCDay()); // Use getUTCDay
    const monthName = getMonthName(date.getUTCMonth()); // Use getUTCMonth
    
    return `${weekday}, ${day} de ${monthName} de ${year}`;
}
  
  // Função auxiliar para adicionar zero à esquerda, se necessário
  const addZeroToDate = (value: number): string => {
    return value < 10 ? `0${value}` : `${value}`;
  }
  
  // Função auxiliar para obter o nome do dia da semana
  const getWeekdayName = (dayOfWeek: number): string => {
    const weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return weekdays[dayOfWeek];
  }
  
  // Função auxiliar para obter o nome do mês
  const getMonthName = (month: number): string => {
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return months[month];
  }
  
  export const parseDate = (dateStr: string): Date => {
    const [year, month, day] = dateStr.split('-').map(Number);
    // O mês em JavaScript é baseado em zero, então subtraímos 1
    return new Date(Date.UTC(year, month - 1, day));
};
