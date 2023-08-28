const html = document.querySelector('html')
const focoBT =  document.querySelector('.app__card-button--foco')
const curtoBT =  document.querySelector('.app__card-button--curto')
const longoBT = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes =  document.querySelectorAll('.app__card-button')
const musicafocoinput = document.querySelector('#alternar-musica')
const iniciaroupausarbt = document.querySelector('#start-pause span')
const musica = new Audio ('/sons/luna-rise-part-one.mp3')
const startpausebt = document.querySelector('#start-pause')
const audioplay = new Audio('/sons/play.wav');
const audiopausa = new Audio('/sons/pause.mp3');
const audiopempofinalizado = new Audio('./sons/beep.mp3')
const pausarouiniciarbticon = document.querySelector('.app__card-primary-butto-icon')
const temponatela =  document.querySelector('#timer')

let tempodecorridoemsegundos = 1500
let intervaloid = null

musica.loop = true

musicafocoinput.addEventListener('change' , () =>{
    if(musica.paused) {
        musica.play()
}   else {
    musica.pause()
}
})

focoBT.addEventListener('click', () => {
    tempodecorridoemsegundos = 1500
    alterarcontexto('foco')
    focoBT.classList.add('active')
})

curtoBT.addEventListener('click', () => {
    tempodecorridoemsegundos = 300
    alterarcontexto('descanso-curto')
    curtoBT.classList.add('active')
})

longoBT.addEventListener('click', () => {
    tempodecorridoemsegundos = 900
    alterarcontexto('descanso-longo')
    longoBT.classList.add('active')
})


function alterarcontexto(contexto) {
    mostrarTempo()
    botoes.forEach( function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const contagemregressiva = () =>{
    if (tempodecorridoemsegundos <=0 ){
       audiotempofinalizado.play()
        alert('tempo Finalizado')
        zerar()
        return
    }
    tempodecorridoemsegundos -= 1
    mostrarTempo()

}

startpausebt.addEventListener('click' , iniciaroupausar)

function iniciaroupausar () {
    if(intervaloid) {
        audiopausa.play()
        zerar()
        return
    }
    audioplay.play()
    intervaloid = setInterval(contagemregressiva,1000)
    iniciaroupausarbt.textContent = 'Pausar'
    pausarouiniciarbticon.setAttribute('src' , `/imagens/pause.png`)
}

function zerar() {
    clearInterval(intervaloid)
    intervaloid = null
    iniciaroupausarbt.textContent = 'Começar'
    pausarouiniciarbticon.setAttribute('src' , `/imagens/play_arrow.png`)
}

function mostrarTempo(){
    const tempo = new Date(tempodecorridoemsegundos * 1000)
    const tempoformatado = tempo.toLocaleString('pt-br' ,{minute : '2-digit' , second : '2-digit'})
    temponatela.innerHTML =`${tempoformatado}`
}

mostrarTempo()