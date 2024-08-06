export const formatCurrencyBRL = (amount: number): string => {
  return amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};


export const removeCurrencyFormatting = (value: string): number => {
  // Remove caracteres que não são dígitos ou ponto decimal
  const numericValue = value.replace(/[^\d,-]/g, '').replace(',', '.');
  return parseFloat(numericValue) || 0;
};




// export const formatCurrencyBRL = (amount: number): string => {
//   return amount.toLocaleString("pt-BR", {
//     style: "currency",
//     currency: "BRL",
//   });
// };


// export const formatCurrencyBRL = (value: number) => {
//   return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
// };



// export const formatCurrencyBRL = (value: number): string => {
//     return value.toLocaleString("pt-BR", {
//       style: "currency",
//       currency: "BRL",
//     });
//   };