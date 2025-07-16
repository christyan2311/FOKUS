const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const startPauseBtn = document.querySelector('#start-pause');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3');
const iniciarOuPausarBtn = document.querySelector('#start-pause span');
const iniciarOuPausarIcone = document.querySelector('.app__card-primary-butto-icon');

let tempoDecorridoEmSegundos = 5;
let intervaloId = null

musica.loop = true;

musicaFocoInput.addEventListener('change', function () {
  if (musicaFocoInput.checked) {
    musica.play();
  } else {
    musica.pause();
  }
});


focoBtn.addEventListener('click', () => {
  alterarContexto('foco');
  focoBtn.classList.add('active')
});

curtoBtn.addEventListener('click', () => {
  alterarContexto('descanso-curto');
  curtoBtn.classList.add('active');
});

longoBtn.addEventListener('click', () => {
  alterarContexto('descanso-longo');
  longoBtn.classList.add('active');
});

function alterarContexto(contexto) {
  botoes.forEach(function (contexto) {
    contexto.classList.remove('active');
  });
  html.setAttribute('data-contexto', contexto);
  banner.setAttribute('src', `/imagens/${contexto}.png`);
  switch (contexto) {
    case 'foco':
      titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case 'descanso-curto':
      titulo.innerHTML = `Que tal dar uma respirada?,<br>
                <strong class="app__title-strong">Faça uma pausa curta.</strong>`;
      break;
    case 'descanso-longo':
      titulo.innerHTML = `Hora de voltar à superfície,<br>
                <strong class="app__title-strong">faça um pausa longa.</strong>`;
    default:
      break;
  }
}

const contagemRegressiva = () =>{
  if (tempoDecorridoEmSegundos <= 0){
    audioTempoFinalizado.play()
    alert('Tempo finalizado!')
    zerar()
    return
  }
    
  tempoDecorridoEmSegundos -=1
  console.log('Temporizador: ' + tempoDecorridoEmSegundos)

}

startPauseBtn.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    audioPausa.play()
    zerar()
    return
  }
  audioPlay.play();
  intervaloId = setInterval(contagemRegressiva, 1000)
  iniciarOuPausarBtn.textContent = 'Pausar';
  iniciarOuPausarIcone.setAttribute('src', `/imagens/pause.png`)
}

function zerar() {
  clearInterval(intervaloId)
  iniciarOuPausarBtn.textContent ='Começar';
  intervaloId = null
  iniciarOuPausarBtn.setAttribute('src', `/imagens/play_arrow.png`)

}