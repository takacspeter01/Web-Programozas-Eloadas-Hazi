const apiUrl = "http://gamf.nhely.hu/ajax2/";
const code = "4gr2fg1gbn43uwi4ea4sg2qr10";

function readData() {
  fetch(apiUrl, {
    method: "POST",
    body: new URLSearchParams({ op: "read", code })
  })
    .then(res => res.json())
    .then(data => {
      let html = "";
      let heights = [];
      data.list.forEach(item => {
        html += `<p>ID: ${item.id} | Név: ${item.name} | Magasság: ${item.height} | Súly: ${item.weight}</p>`;
        heights.push(parseInt(item.height));
      });
      document.getElementById("output").innerHTML = html;

      const sum = heights.reduce((a, b) => a + b, 0);
      const avg = (sum / heights.length).toFixed(2);
      const max = Math.max(...heights);

      document.getElementById("stats").innerText =
        `Magasságok – Összeg: ${sum}, Átlag: ${avg}, Max: ${max}`;
    });
}

function createData() {
  const name = document.getElementById("createName").value.trim();
  const height = document.getElementById("createHeight").value.trim();
  const weight = document.getElementById("createWeight").value.trim();

  if (!name || !height || !weight || name.length > 30) {
    document.getElementById("createMsg").innerText = "Hibás adat!";
    return;
  }

  fetch(apiUrl, {
    method: "POST",
    body: new URLSearchParams({
      op: "create",
      name, height, weight, code
    })
  })
    .then(res => res.text())
    .then(res => {
      document.getElementById("createMsg").innerText = "Hozzáadás sikeres!";
      readData();
    });
}

function getDataForId() {
  const id = document.getElementById("updateId").value.trim();
  if (!id) return;
  fetch(apiUrl, {
    method: "POST",
    body: new URLSearchParams({ op: "read", code })
  })
    .then(res => res.json())
    .then(data => {
      const item = data.list.find(e => e.id === id);
      if (item) {
        document.getElementById("updateName").value = item.name;
        document.getElementById("updateHeight").value = item.height;
        document.getElementById("updateWeight").value = item.weight;
      } else {
        alert("Nem található ID.");
      }
    });
}

function updateData() {
  const id = document.getElementById("updateId").value.trim();
  const name = document.getElementById("updateName").value.trim();
  const height = document.getElementById("updateHeight").value.trim();
  const weight = document.getElementById("updateWeight").value.trim();

  if (!id || !name || !height || !weight || name.length > 30) {
    document.getElementById("updateMsg").innerText = "Hibás adat!";
    return;
  }

  fetch(apiUrl, {
    method: "POST",
    body: new URLSearchParams({
      op: "update",
      id, name, height, weight, code
    })
  })
    .then(res => res.text())
    .then(res => {
      document.getElementById("updateMsg").innerText = "Frissítés sikeres!";
      readData();
    });
}

function deleteData() {
  const id = document.getElementById("deleteId").value.trim();
  if (!id) return;

  fetch(apiUrl, {
    method: "POST",
    body: new URLSearchParams({
      op: "delete",
      id, code
    })
  })
    .then(res => res.text())
    .then(res => {
      document.getElementById("deleteMsg").innerText = "Törlés sikeres!";
      readData();
    });
}