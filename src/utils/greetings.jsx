export default function Greetings() {
  const now = new Date();
  const hours = now.getHours();

  if (hours > 0 && hours < 0) {
  }
}

// const Greeting = () => {
//   // Obtém a hora atual do servidor
//   const now = new Date();
//   const hours = now.getHours();

//   // Define a saudação com base na hora atual
//   const greeting = hours < 12 ? 'Bom dia' : 'Boa tarde';

//   return <div className="text-xl font-bold">{greeting}</div>;
// };

//export default function Home() {
//   return (
//     <div className="p-4">
//       <Greeting />
//     </div>
//   );
// }
