export const formatCurrencyBRL = (value: number) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};



// export const formatCurrencyBRL = (value: number): string => {
//     return value.toLocaleString("pt-BR", {
//       style: "currency",
//       currency: "BRL",
//     });
//   };