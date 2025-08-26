import React from "react";

const fakeUsers = [
  { id: 1, name: "Usuário 1", email: "usuario1@gmail.com" },
  { id: 2, name: "Usuário 2", email: "usuario2@gmail.com" },
  { id: 3, name: "Usuário 3", email: "usuario3@gmail.com" },
]

const Userlist: React.FC = () => {
  return (
    <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <h1>Lista de Usuários</h1>
      <p>Esta é a página de lista de usuários do nosso protótipo.</p>
      <p>Observe o botão flutuante no canto inferior direito da tela.</p>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Usuários Cadastrados</h2>
        <ul>
          <li>Usuário 1</li>
          <li>Usuário 2</li>
          <li>Usuário 3</li>
          <li>Usuário 4</li>
        </ul>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '8px', 
          marginTop: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3>Detalhes do Usuário</h3>
          <p>Selecione um usuário para ver mais detalhes.</p>
        </div>
      </div>
    </div>
  );
};

export default Userlist;