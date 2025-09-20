// Função para converter CSV em array de objetos
function csvToArray(str, delimiter = ",") {
  const rows = str.trim().split("\n");
  const headers = rows[0].split(delimiter).map(h => h.trim());
  return {
    headers,
    data: rows.slice(1).map(row => {
      const values = row.split(delimiter);
      return headers.reduce((object, header, index) => {
        object[header] = values[index]?.trim() || "";
        return object;
      }, {});
    })
  };
}

// Renderiza tabela com filtros
function renderTable(data, headers) {
  const container = document.getElementById("table-container");
  container.innerHTML = "";

  const table = document.createElement("table");

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const filterRow = document.createElement("tr");

  headers.forEach(header => {
    // Header
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);

    // Filtro
    const filterCell = document.createElement("th");
    const input = document.createElement("input");
    input.classList.add("filter");
    input.placeholder = `Filtrar ${header}`;
    input.addEventListener("input", () => applyFilters(data, headers));
    filterCell.appendChild(input);
    filterRow.appendChild(filterCell);
  });

  thead.appendChild(headerRow);
  thead.appendChild(filterRow);
  table.appendChild(thead);

  // Corpo
  const tbody = document.createElement("tbody");
  data.forEach(row => {
    const tr = document.createElement("tr");
    headers.forEach(header => {
      const td = document.createElement("td");
      td.textContent = row[header];
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}

// Filtros
function applyFilters(data, headers) {
  const inputs = document.querySelectorAll(".filter");
  const filteredData = data.filter(row => {
    return headers.every((header, i) => {
      const value = row[header].toLowerCase();
      const filterValue = inputs[i].value.toLowerCase();
      return value.includes(filterValue);
    });
  });
  renderTable(filteredData, headers);
}

// Carregar CSV fixo
fetch("{{ url_for('static', filename='frc_teams_brasil.csv') }}")
  .then(response => response.text())
  .then(text => {
    const { headers, data } = csvToArray(text);
    renderTable(data, headers);
  })
  .catch(error => console.error("Erro ao carregar CSV:", error));
