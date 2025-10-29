var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

var criaNozTempo = 1500
var primeiraNozCriada = false
var gameLoopTimer = null
var nivel = window.location.search
nivel = nivel.replace('?', '')

if (!nivel) {
	nivel = 'normal'
}

if (nivel === 'facil') {
	criaNozTempo = 1500
} else if (nivel === 'normal') {
	criaNozTempo = 1000
} else if (nivel === 'dificil') {
	criaNozTempo = 700
}

function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight
	largura = window.innerWidth
}

function gameLoop() {
	var nozAnterior = document.getElementById('noz');

	if (primeiraNozCriada) {
		if (nozAnterior) {
			if (vidas > 3) {
				window.location.href = 'fim_de_jogo.html'
				return;
			} else {
				document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
				vidas++
			}

			animateMiss(nozAnterior, function () {
				criarNovaNoz();
				gameLoopTimer = setTimeout(gameLoop, criaNozTempo);
			});
			return;
		}
	} else {
		primeiraNozCriada = true
	}

	criarNovaNoz();
	gameLoopTimer = setTimeout(gameLoop, criaNozTempo);
}

var cronometro = setInterval(function () {
	tempo -= 1
	if (tempo < 0) {
		clearInterval(cronometro)
		if (gameLoopTimer) clearTimeout(gameLoopTimer)
		window.location.href = 'vitoria.html'
	} else if (document.getElementById('cronometro')) {
		document.getElementById('cronometro').innerHTML = tempo
	}
}, 1000)

function criarNovaNoz() {
	if (document.getElementById('noz')) return;

	var posicaoX = Math.floor(Math.random() * largura) - 90
	var posicaoY = Math.floor(Math.random() * altura) - 90
	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	console.log(posicaoX, posicaoY)

	var noz = document.createElement('img')
	noz.src = 'imagens/noz.png'
	noz.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
	noz.dataset.nivel = nivel || 'normal'
	noz.style.left = posicaoX + 'px'
	noz.style.top = posicaoY + 'px'
	noz.style.position = 'absolute'
	noz.id = 'noz'
	noz.onclick = function () {
		removerNoz(this);
	}
	document.body.appendChild(noz)
}

function removerNoz(nozParaRemover) {
	if (!nozParaRemover) {
		return;
	}

	nozParaRemover.onclick = null;
	nozParaRemover.id = 'noz_removendo';

	// tocar som de coletar (se disponível)
	try {
		var som = document.getElementById('som_coletar')
		if (som) {
			som.currentTime = 0
			som.volume = 0.8
			var p = som.play()
			if (p !== undefined) p.catch(function () {})
		}
	} catch (err) {}

	nozParaRemover.classList.add('collected')

	nozParaRemover.style.transition = nozParaRemover.style.transition || 'opacity 0.5s ease-out, transform 0.5s ease-out'
	nozParaRemover.style.opacity = nozParaRemover.style.opacity || 0

	setTimeout(function () {
		if (nozParaRemover && nozParaRemover.parentNode) {
			nozParaRemover.parentNode.removeChild(nozParaRemover)
		}
	}, 500)
}

function animateMiss(nozElem, onAnimationEndCallback) {
	if (!nozElem) {
		if (onAnimationEndCallback) onAnimationEndCallback();
		return;
	}

	nozElem.onclick = null;
	nozElem.id = 'noz_removendo';

	// tocar som de miss (se disponível)
	try {
		var somM = document.getElementById('som_miss')
		if (somM) {
			somM.currentTime = 0
			somM.volume = 0.7
			var pm = somM.play()
			if (pm !== undefined) pm.catch(function () {})
		}
	} catch (err) {}

	nozElem.classList.add('missed')

	nozElem.style.transition = nozElem.style.transition || 'opacity 0.7s ease, transform 0.7s ease'
	nozElem.style.opacity = 0
	nozElem.style.transform = nozElem.style.transform || 'translateY(120px) rotate(20deg) scale(0.8)'

	setTimeout(function () {
		if (nozElem && nozElem.parentNode) {
			nozElem.parentNode.removeChild(nozElem)
		}
		if (onAnimationEndCallback) {
			onAnimationEndCallback();
		}
	}, 700)
}

function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3)
	switch (classe) {
		case 0: return 'noz1'
		case 1: return 'noz2'
		case 2: return 'noz3'
	}
}

function ladoAleatorio() {
	var classe = Math.floor(Math.random() * 2)
	switch (classe) {
		case 0: return 'ladoA'
		case 1: return 'ladoB'
	}
}

document.addEventListener('DOMContentLoaded', function () {
	ajustaTamanhoPalcoJogo();
	gameLoop();

	if (document.getElementById('cronometro')) {
		document.getElementById('cronometro').innerHTML = tempo;
	}
});