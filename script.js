<script>
const ESP32_IP = "http://192.168.1.100"; // 🔁 CHANGE THIS

const statusEl = document.querySelector(".status");

// sensor elements
const sensors = {
  temp: document.getElementById("temp"),
  light: document.getElementById("light"),
  dist: document.getElementById("dist"),
  moisture: document.getElementById("moisture"),
  gas: document.getElementById("gas"),
  touch: document.getElementById("touch"),
  obstacle: document.getElementById("obstacle"),
  hall: document.getElementById("hall"),
};

// set all values to N/A
function setOffline() {
  statusEl.innerText = "● ESP32 OFFLINE";
  statusEl.style.color = "red";

  for (let k in sensors) {
    sensors[k].innerText = "--";
  }
}

// check ESP32 status
async function checkESP32() {
  try {
    const res = await fetch(`${ESP32_IP}/status`, { cache: "no-store" });
    if (!res.ok) throw new Error();

    statusEl.innerText = "● ESP32 LIVE";
    statusEl.style.color = "#00ff7b";

    getSensorData();
  } catch (e) {
    setOffline();
  }
}

// fetch real sensor data
async function getSensorData() {
  try {
    const res = await fetch(`${ESP32_IP}/sensors`, { cache: "no-store" });
    const data = await res.json();

    sensors.temp.innerText = data.temp + " °C";
    sensors.light.innerText = data.light + " %";
    sensors.dist.innerText = data.distance + " cm";
    sensors.moisture.innerText = data.moisture + " %";
    sensors.gas.innerText = data.gas;
    sensors.touch.innerText = data.touch ? "TOUCHED" : "NOT TOUCHED";
    sensors.obstacle.innerText = data.obstacle ? "DETECTED" : "CLEAR";
    sensors.hall.innerText = data.hall ? "MAGNET" : "NO MAGNET";

  } catch (e) {
    setOffline();
  }
}

// run every 2 seconds
setInterval(checkESP32, 2000);
setOffline();
</script>
