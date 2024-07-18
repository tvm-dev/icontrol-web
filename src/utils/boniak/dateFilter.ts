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
    let [year, month] = date.split('-').map(Number); // Convertendo diretamente para número
  

    for (let i in transactions) {
        const transactionDate = new Date(transactions[i].date); // Converter para Date

        // Verificar se transactionDate é um objeto Date válido
        if (!isNaN(transactionDate.getTime())) {
            if (
                transactionDate.getFullYear() === year &&
                (transactionDate.getMonth() + 1) === month
            ) {
                newListTransaction.push(transactions[i]);
            }
        } else {
            console.error('Invalid date:', transactions[i].date);
        }
    }

    return newListTransaction;
};

export const formatCurrentMonth = (currentMonth: string): string => {
    let [year, month] = currentMonth.split('-');
    let allMonths = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    return ` ${allMonths[parseInt(month) - 1]} de ${year}`;
}



export const formatDateBr = (date: Date): string => {
    const day = addZeroToDate(date.getDate());
    const month = addZeroToDate(date.getMonth() + 1); // Mês é baseado em zero, então adicionamos 1
    const year = date.getFullYear();
    const weekday = getWeekdayName(date.getDay()); // Obtém o nome do dia da semana
    const monthName = getMonthName(date.getMonth()); // Obtém o nome do mês
    
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







// interface TransactionsProps {
//     id: string;
//     description: string;
//     amount: number;
//     date: string;
//     payment: string;
//     category: string;
//     type: number;
//     details: string;
//     paid: boolean;
// }

// export type Transactions = {
//     description: string;
//     amount: number;
//     date: Date;
    
// }
  


// export const getCurrentMonth = () => {
//     let now = new Date()
//     return `${now.getFullYear()}-${now.getMonth() + 1}` // More 1 because in js, month start in 0.
// }

// export const filterTransactionsByMonth = (transactions: Transactions[], date: string): Transactions[] => {

//     let newTransaction: Transactions[] = []
//     let [year, month] = date.split('-')

//     for (let i in transactions) {
//         if (
//             transactions[i].date.getFullYear() === parseInt(year) && 
//             (transactions[i].date.getMonth() + 1) === parseInt(month)
//         ) {
//             newTransaction.push(transactions[i])
//         }
//     }
    
 


//     return newTransaction;

// }