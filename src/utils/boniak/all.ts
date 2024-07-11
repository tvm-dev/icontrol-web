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
//   }

export type Category = {
  [tag: string]: {
      title: string;
      color: string;
      expense: boolean
  }
}

export const categories: Category = {
  food: { title: 'Alimentação', color: 'blue', expense: true},
  rent: { title: 'Aluguel', color: 'brown', expense: true},
  salary: { title: 'Salário', color: 'green', expense: false},
}


type Item = {
  date: Date;
  category: string;
  title: string;
  value: number;
}


export const items: Item[] = [
  {date: new Date(2024, 9, 15), category: 'food', title:'McDonalds', value: 32.58},
  {date: new Date(2024, 9, 15), category: 'food', title:'Burger King', value: 28},
  {date: new Date(2024, 9, 16), category: 'food', title:'Aluguel Apto', value: 2300},
  {date: new Date(2024, 9, 18), category: 'rent', title:'Salario ACME', value: 4500},
  {date: new Date(2024, 10, 28), category: 'salary', title:'Feira de Agua', value: 22.50},
]
