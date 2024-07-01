export default function About() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
            Sobre o iControl: nosso App de Controle Financeiro
          </h1>

          <p className="text-lg mb-4">
            Nosso aplicativo de controle financeiro pessoal é a ferramenta
            perfeita para quem deseja ter controle total sobre suas finanças.
            Com uma interface amigável e intuitiva, ele permite que você
            gerencie todas as suas transações financeiras de maneira eficiente e
            organizada.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-blue-500">
            Funcionalidades do Aplicativo
          </h2>
          <ul className="list-disc list-inside mb-6">
            <li>Registro de receitas e despesas com descrição detalhada</li>
            <li>Categorização de transações para melhor organização</li>
            <li>Visualização de todas as transações em um só lugar</li>
            <li>Filtragem de transações por data, categoria e tipo</li>
            <li>Gráficos e relatórios para análise de gastos e receitas</li>
            <li>
              Alertas e notificações para lembrar de pagamentos e vencimentos
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-blue-500">
            Por que é importante?
          </h2>
          <p className="text-lg mb-4">
            Manter o controle das suas finanças pessoais é crucial para alcançar
            seus objetivos financeiros, evitar dívidas e garantir um futuro
            financeiro estável. Nosso aplicativo facilita esse processo,
            oferecendo todas as ferramentas necessárias para que você possa:
          </p>
          <ul className="list-disc list-inside mb-6">
            <li>Entender onde e como seu dinheiro está sendo gasto</li>
            <li>Identificar áreas onde é possível economizar</li>
            <li>Planejar e definir orçamentos mensais</li>
            <li>Monitorar o progresso dos seus objetivos financeiros</li>
            <li>Tomar decisões financeiras mais informadas</li>
          </ul>

          <p className="text-lg mb-4">
            Com nosso aplicativo de controle financeiro pessoal, você terá todas
            as informações que precisa na palma da sua mão, possibilitando uma
            gestão financeira mais consciente e eficiente.
          </p>
        </div>
      </div>
    </>
  );
}
