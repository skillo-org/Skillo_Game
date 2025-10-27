
var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

var criaNozTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel === 'facil') {
	//1500
	criaNozTempo = 1500
} else if(nivel === 'normal') {
	//1000
	criaNozTempo = 1000
} else if (nivel === 'dificil') {
	//650
	criaNozTempo = 700
}

function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight
	largura = window.innerWidth

}

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function() {

	tempo -= 1

	if(tempo < 0) {
		clearInterval(cronometro)
		clearInterval(criaNoz)
		window.location.href = 'vitoria.html'
	} else {
		document.getElementById('cronometro').innerHTML = tempo
	}
	
}, 1000)


function posicaoRandomica() {


	//remover a noz anterior (caso exista)
	if(document.getElementById('noz')) {
		document.getElementById('noz').remove()

		//console.log('elemento selecionado foi: v' + vidas)
		if(vidas > 3) {

			window.location.href = 'fim_de_jogo.html'
		} else {
			document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"

			vidas++
		}
	}

	var posicaoX = Math.floor(Math.random() * largura) - 90
	var posicaoY = Math.floor(Math.random() * altura) - 90

	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	console.log(posicaoX, posicaoY)

	//criar o elemento html
	var noz = document.createElement('img')
	noz.src = 'imagens/noz.png'
	noz.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
	noz.style.left = posicaoX + 'px'
	noz.style.top = posicaoY + 'px'
	noz.style.position = 'absolute'
	noz.id = 'noz'
	noz.onclick = function() {
		this.remove()
	}

	document.body.appendChild(noz)

}

function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3)
	
	switch(classe) {
		case 0:
			return 'noz1'
		
		case 1:
			return 'noz2'

		case 2:
			return 'noz3'
	}
}

function ladoAleatorio() {
	var classe = Math.floor(Math.random() * 2)
	
	switch(classe) {
		case 0:
			return 'ladoA'
		
		case 1:
			return 'ladoB'

	}
}

