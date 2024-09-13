function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData("text");
  let player = document.getElementById(data);

  if (event.target.tagName === "LI") {
    event.target.parentNode.insertBefore(player, event.target.nextSibling);
  } else if (event.target.classList.contains("team-list")) {
    event.target.appendChild(player);
  }

  player.onclick = () => {
    if (
      player.parentElement.id === "meu-time" ||
      player.parentElement.id === "time-inimigo"
    ) {
      removeFromTeam(player.id);
    }
  };

  updateTotals();
}

document.querySelectorAll(".player-list li").forEach((player, index) => {
  player.id = `player-${index + 1}`;
  player.onclick = () => removeFromTeam(player.id);
});

function moveToTeam(playerId, teamId) {
  let player = document.getElementById(playerId);
  let team = document.getElementById(teamId);
  team.appendChild(player);

  player.onclick = () => {
    if (
      player.parentElement.id === "meu-time" ||
      player.parentElement.id === "time-inimigo"
    ) {
      removeFromTeam(player.id);
    }
  };

  updateTotals();
}

function removeFromTeam(playerId) {
  let player = document.getElementById(playerId);
  let tier = document.getElementById("tier1");
  tier.appendChild(player);

  player.onclick = null;

  updateTotals();
}

function updateTotals() {
  const totalMeuTime = Array.from(
    document.getElementById("meu-time").children
  ).reduce(
    (acc, li) => acc + parseInt(li.querySelector(".valor").textContent),
    0
  );
  document.getElementById("total-meu-time").textContent = totalMeuTime;

  const totalTimeInimigo = Array.from(
    document.getElementById("time-inimigo").children
  ).reduce(
    (acc, li) => acc + parseInt(li.querySelector(".valor").textContent),
    0
  );
  document.getElementById("total-time-inimigo").textContent = totalTimeInimigo;
}

document.querySelectorAll(".player-list li").forEach((player) => {
  player.onclick = () => removeFromTeam(player.id);
});

document.getElementById("flipButton").addEventListener("click", function () {
  const flipResult = Math.random() < 0.5 ? "Cara" : "Coroa";
  document.getElementById(
    "coinResult"
  ).textContent = `Resultado: ${flipResult}`;
});
