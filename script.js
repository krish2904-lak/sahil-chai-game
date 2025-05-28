const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const names = ["Nishant", "Lakshya", "Sahil"];
const colors = ["#f44336", "#2196f3", "#4caf50"];
const arc = (2 * Math.PI) / names.length;

function drawWheel() {
  for (let i = 0; i < names.length; i++) {
    const angle = i * arc;

    // Draw segment
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 200, angle, angle + arc);
    ctx.fillStyle = colors[i];
    ctx.fill();

    // Draw text
    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText(names[i], 170, 10);
    ctx.restore();
  }
}

drawWheel();

let rotation = 0;

document.getElementById("spinBtn").addEventListener("click", () => {
  const randomRotation = Math.floor(Math.random() * 360) + 720; // 2 full spins minimum
  rotation += randomRotation;

  canvas.style.transition = 'transform 5s ease-out';
  canvas.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    const normalizedRotation = rotation % 360;
    const segmentAngle = 360 / names.length;

    // Fix: add 180 degrees offset to match top arrow pointing correctly
    const index = Math.floor((360 - normalizedRotation + 180 + segmentAngle / 2) % 360 / segmentAngle);

    document.getElementById("result").innerText = `☕ आज चाय लाएगा: ${names[index]}`;
  }, 5000);
});
