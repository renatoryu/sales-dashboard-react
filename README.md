<div align="center">

# 📊 Sales Performance Dashboard

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
<img src="https://img.shields.io/badge/Chart.js-F5788D?style=for-the-badge&logo=chart.js&logoColor=white" alt="Chart.js" />

<br />

> Um painel analítico de vendas moderno e responsivo, simulando um ambiente corporativo real.

<br />

<a href="https://sales-dashboard-react-beige.vercel.app/" target="_blank">
  <img src="https://img.shields.io/badge/Ver_Demo_Online_🚀-2ea44f?style=for-the-badge&logo=vercel&logoColor=white" alt="Demo Online" />
</a>

</div>

---

## 🖼️ Preview
<img width="100%" alt="Dashboard Preview" src="https://github.com/user-attachments/assets/a8c6183f-b995-45ad-823f-4e7c019d6a93" />

## 🚀 Sobre o Projeto

Este projeto é uma aplicação Front-End desenvolvida para visualizar métricas de desempenho de vendas. O objetivo principal foi implementar **filtros em cascata (dependent dropdowns)** e renderização dinâmica de gráficos.

Ao selecionar uma **Categoria**, os **Produtos** disponíveis são atualizados. Ao selecionar um Produto, as **Marcas** são filtradas. O gráfico responde instantaneamente a essas mudanças.

## ✨ Funcionalidades

-   **Filtros Dependentes:** Lógica avançada onde a escolha de um campo reseta e filtra as opções do campo seguinte (Categoria → Produto → Marca).
-   **Visualização de Dados:** Gráfico de linhas interativo utilizando `Chart.js` com preenchimento de área (gradient fill).
-   **UI/UX Profissional:** Design limpo estilo "Enterprise", com paleta de cores sóbria, sombras suaves e tipografia moderna.
-   **Mock Data Robusto:** Estrutura de dados complexa simulando cenários reais de varejo (Eletrônicos, Comida, Bebida, etc.).
-   **Responsividade:** Layout adaptável para diferentes tamanhos de tela.

## 🛠️ Tecnologias Utilizadas

-   **React.js:** Biblioteca principal para construção da interface.
-   **Vite:** Build tool rápida para desenvolvimento ágil.
-   **Chart.js & React-Chartjs-2:** Para criação e manipulação dos gráficos.
-   **CSS-in-JS:** Estilização modularizada dentro dos componentes.

## 📦 Como Rodar o Projeto

Siga os passos abaixo para executar o projeto em sua máquina local:

```bash
# 1. Clone o repositório
git clone [https://github.com/SEU_USUARIO/NOME_DO_REPO.git](https://github.com/SEU_USUARIO/NOME_DO_REPO.git)

# 2. Entre na pasta do projeto
cd NOME_DO_REPO

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev

O projeto estará rodando em `http://localhost:5173`.
```

## 📂 Estrutura de Pastas
```
src/
├── mockData.js       # Dados simulados (JSON Structure)
├── SalesChart.jsx    # Componente Principal (Lógica + UI)
├── main.jsx          # Ponto de entrada da aplicação
└── App.jsx           # Container raiz
```

## 🤝 Contribuição

Contribuições são bem-vindas\! Sinta-se à vontade para abrir issues ou enviar pull requests.

-----

Desenvolvido com 💙

````

Depois de salvar o arquivo com esse novo conteúdo, é só fazer o commit e o push novamente para o GitHub:

```bash
git add README.md
git commit -m "Atualiza README com documentação do projeto"
git push
````
