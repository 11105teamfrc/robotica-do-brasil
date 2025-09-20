// --- FUNÇÕES ÚTEIS ---


/**
* Retorna o time pelo id (número da equipe). Se não existir, retorna null.
* @param {number} id
*/
export function getTeamById(id) {
return teams.find(t => t.id === Number(id)) || null;
}


/**
* Renderiza uma tabela HTML com as colunas na ordem solicitada:
* ID (Número), Nome, Estado, Escola
* containerSelector pode ser um id ("#minhaDiv") ou qualquer seletor válido
*/
export function renderTable(containerSelector, data = teams) {
const container = document.querySelector(containerSelector);
if (!container) throw new Error(`Container não encontrado: ${containerSelector}`);


// Cabeçalho
const table = document.createElement('table');
table.classList.add('dados-frc-table');
const thead = document.createElement('thead');
const headerRow = document.createElement('tr');
['ID', 'Nome', 'Estado', 'Escola'].forEach(h => {
const th = document.createElement('th');
th.textContent = h;
headerRow.appendChild(th);
});
thead.appendChild(headerRow);
table.appendChild(thead);


// Corpo
const tbody = document.createElement('tbody');
data.forEach(team => {
const tr = document.createElement('tr');
const idTd = document.createElement('td'); idTd.textContent = team.id; tr.appendChild(idTd);
const nomeTd = document.createElement('td'); nomeTd.textContent = team.nome; tr.appendChild(nomeTd);
const estadoTd = document.createElement('td'); estadoTd.textContent = team.estado; tr.appendChild(estadoTd);
const escolaTd = document.createElement('td'); escolaTd.textContent = team.escola || '-'; tr.appendChild(escolaTd);
tbody.appendChild(tr);
});
table.appendChild(tbody);


// Limpa container e insere tabela
container.innerHTML = '';
container.appendChild(table);
}


/**
* Exemplo de uso para quem preferir carregar os dados em tempo de execução
* (não incluso aqui): você poderia ter um arquivo CSV/JSON e fazer fetch para
* obter os dados, convertê-los em objetos no formato acima e então chamar renderTable.
*/


// Export padrão opcional
export default { teams, getTeamById, renderTable };