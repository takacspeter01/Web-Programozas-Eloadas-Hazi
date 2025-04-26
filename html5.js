// Web Storage
function saveStorage() {
  const input = document.getElementById('storageInput').value;
  localStorage.setItem('myData', input);
  alert('Elmentve!');
}

function loadStorage() {
  const data = localStorage.getItem('myData');
  document.getElementById('storageResult').textContent = 'Mentett adat: ' + (data || 'Nincs adat');
}

// Web Worker (szimulált számolás)
let worker;
function startWorker() {
  if (typeof(Worker) !== "undefined") {
    if (!worker) {
      worker = new Worker("worker.js");
      worker.onmessage = function(e) {
        document.getElementById("workerResult").textContent = e.data;
      };
    }
  } else {
    alert("A böngésződ nem támogatja a Web Workert.");
  }
}

// SSE (demo szerver nélkül)
function startSSE() {
  if (!!window.EventSource) {
    const source = new EventSource("https://stream.wikimedia.org/v2/stream/recentchange");
    source.onmessage = function(event) {
      const data = JSON.parse(event.data);
      document.getElementById("sseOutput").textContent = "Legutóbbi változás: " + data.title;
      source.close();
    };
  } else {
    alert("A böngésződ nem támogatja a Server-Sent Events-et.");
  }
}
// Geolocation
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      document.getElementById("geoResult").textContent =
        `Szélesség: ${position.coords.latitude}, Hosszúság: ${position.coords.longitude}`;
    }, () => {
      document.getElementById("geoResult").textContent = "Nem sikerült lekérni a helyzetet.";
    });
  } else {
    alert("A böngésződ nem támogatja a geolokációt.");
  }
}

// Drag and Drop
const dragMe = document.getElementById('dragMe');
const dropHere = document.getElementById('dropHere');

dragMe.addEventListener('dragstart', e => e.dataTransfer.setData('text/plain', 'dragged'));
dropHere.addEventListener('dragover', e => e.preventDefault());
dropHere.addEventListener('drop', e => {
  e.preventDefault();
  dropHere.textContent = 'Sikeresen ledobtad!';
});

// Canvas rajzolás
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = "red";
ctx.fillRect(20, 20, 100, 50);
// számolás szimuláció
let i = 0;
function timedCount() {
  i++;
  postMessage("Számolok... " + i);
  setTimeout(timedCount, 1000);
}
timedCount();