// Definição da interface para TransactionsProps comentada
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

export type Transactions = {
    id: string;
    description: string;
    amount: number;
    date: Date;
    type: string;
    category: string;
};

export const getCurrentMonth = (): string => {
    let now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}`; // Mês começa em 0 no JS.
};

export const filterTransactionsByMonth = (transactions: Transactions[], date: string): Transactions[] => {
    let newTransaction: Transactions[] = [];
    let [year, month] = date.split('-').map(Number); // Convertendo diretamente para número

    for (let i in transactions) {
        let transactionDate = transactions[i].date;

        // Verificar se transactionDate é uma string e convertê-la para Date se necessário
        if (typeof transactionDate === 'string' || typeof transactionDate === 'number') {
            transactionDate = new Date(transactionDate);
        }

        // Verificar se transactionDate é um objeto Date válido
        if (transactionDate instanceof Date && !isNaN(transactionDate.getTime())) {
            if (
                transactionDate.getFullYear() === year &&
                (transactionDate.getMonth() + 1) === month
            ) {
                newTransaction.push(transactions[i]);
            }
        } else {
            console.error('Invalid date:', transactionDate);
        }
    }

    return newTransaction;
};


//function format date:
export const formatDateBr = (date: Date): string => {
    let year = date.getFullYear() % 100;
        let month = date.getMonth()
        let day = date.getDate()
    
        //return `${addZeroToDate(day)}/${addZeroToDate(month)}/${year} `    
        return `${addZeroToDate(day)}` 
    
}
    
//function to add zero to left:
const addZeroToDate = (n: number): string => n < 10 ? `0${n}` : `${n} `
// {
//     if (n < 10) {
//         return `0${n}`
//     } else {
//         return `${n}`
//     }
// }









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