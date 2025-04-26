const table = document.getElementById("chartTable").getElementsByTagName("tbody")[0];
const chartCanvas = document.getElementById("chartCanvas").getContext("2d");

const data = [
  [5, 10, 15, 20, 25],
  [8, 6, 14, 18, 12],
  [12, 22, 10, 16, 8],
  [7, 14, 21, 28, 35],
  [10, 9, 8, 7, 6]
];

function renderTable() {
  data.forEach((row, i) => {
    const tr = document.createElement("tr");
    row.forEach(num => {
      const td = document.createElement("td");
      td.textContent = num;
      tr.appendChild(td);
    });
    tr.addEventListener("click", () => drawChart(row, i + 1));
    table.appendChild(tr);
  });
}

let chart;
function drawChart(rowData, rowIndex) {
  if (chart) chart.destroy();
  chart = new Chart(chartCanvas, {
    type: 'line',
    data: {
      labels: ["1", "2", "3", "4", "5"],
      datasets: [{
        label: `Kiválasztott sor ${rowIndex}`,
        data: rowData,
        fill: false,
        borderColor: 'blue',
        tension: 0.2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      }
    }
  });
}

renderTable();