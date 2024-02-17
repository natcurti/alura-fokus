const html = document.querySelector("html");
const focoBtn = document.querySelector(".app__card-button--foco");
const curtoBtn = document.querySelector(".app__card-button--curto");
const longoBtn = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBtn = document.getElementById("start-pause");
const musicaFocoInput = document.getElementById("alternar-musica");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const somPlay = new Audio("/sons/play.wav");
const somPause = new Audio("/sons/pause.mp3");
const somBeep = new Audio("/sons/beep.mp3");
const iniciarOuPausarBtn = document.querySelector("#start-pause span");
const iniciarOuPausarBtnImg = document.querySelector("#start-pause img");
const tempoNaTela = document.getElementById("timer");
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBtn.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  alterarContexto("foco");
  focoBtn.classList.add("active");
});

curtoBtn.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto("descanso-curto");
  curtoBtn.classList.add("active");
});

longoBtn.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");
  longoBtn.classList.add("active");
});

function alterarContexto(contexto) {
  mostrarTempo();
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
      break;

    case "descanso-curto":
      titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;
      break;

    case "descanso-longo":
      titulo.innerHTML = `
            Hora de voltar a superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `;
      break;
    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    somBeep.play();
    zerar();
    const focoAtivo = html.getAttribute("data-contexto") === "foco";
    if (focoAtivo) {
      let event = new CustomEvent("TarefaFinalizada", {
        detail: {
          message: "A tarefa foi concluída com sucesso!",
          time: new Date(),
        },
        bubbles: true,
        cancelable: true,
      });
      document.dispatchEvent(event);
      tempoDecorridoEmSegundos = 10;
      mostrarTempo();
    }
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
};

startPauseBtn.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    zerar();
    somPause.play();
    return;
  }
  intervaloId = setInterval(contagemRegressiva, 1000);
  somPlay.play();
  iniciarOuPausarBtn.textContent = "Pausar";
  iniciarOuPausarBtnImg.setAttribute("src", "/imagens/pause.png");
}

function zerar() {
  clearInterval(intervaloId);
  iniciarOuPausarBtn.textContent = "Começar";
  iniciarOuPausarBtnImg.setAttribute("src", "/imagens/play_arrow.png");
  intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
