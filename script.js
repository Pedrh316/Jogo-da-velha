let x = true;
let modeIAenabled = false;
let corPlayerO = 'red';
let corPlayerX = 'blue';
let $modoPlayer = document.querySelector('.Player')
let $modoComputer = document.querySelector('.Computer')
let arrMatrizes = [...document.querySelectorAll('.matriz')]

$modoPlayer.addEventListener("click", escolheModoDeJogo)
$modoComputer.addEventListener("click", escolheModoDeJogo)

arrMatrizes.forEach((matriz) => {matriz.addEventListener("click", this.disparaRodada)})

function escolheModoDeJogo(e){
	if(e.target === $modoPlayer){
		let gamePlayer = new Game()
		modeIAenabled = false;
	}
	else {
		let gameComputer = new Game(playerComputer);
		modeIAenabled = true;
	}
    modeChoice.remove();
    setTimeout(() => {
        hideBoard.style.display = 'block';
    }, 1000);
}

function playerComputer(){
	let random = Math.floor(Math.random() * 9);
	if(!Boolean(arrMatrizes[random].textContent)){
		arrMatrizes[random].textContent = 'o'
		arrMatrizes[random].style.color = corPlayerO
	} else{
	  playerComputer();		
	}				
}

class Game{
		constructor(computer){
			this.jogaComputer = computer || function(){};
			this.addEvent = arrMatrizes.forEach(el => el.addEventListener("click", this.disparaRodada))
		}

		disparaRodada = (e) => {
			if(!e.target.textContent){
				this.aplicarXouO(e);
			}
		}

		aplicarXouO(e){

			if(modeIAenabled){
				if(e.target.textContent === ''){
					e.target.style.color = corPlayerX;
					e.target.textContent = 'x';
					if(this.existeVitoriaOuEmpate()){
						return;
					}
                    console.log('continua excecucao')
					this.jogaComputer();
					this.existeVitoriaOuEmpate();
				}
			}
			if(!modeIAenabled){
				if(x === true && e.target.textContent === ''){
					e.target.textContent = 'x'
					e.target.style.color = corPlayerX 					
					this.mudaJogador();
                    this.existeVitoriaOuEmpate()
				} 
				if(x === false && e.target.textContent === ''){
                    e.target.textContent = 'o';
					e.target.style.color = corPlayerO;				
					this.mudaJogador();
                    this.existeVitoriaOuEmpate()
				}
			}

		}

		mudaJogador(){
			x === true ? x = false : x = true;
		}

		combinacoesDeVitoria = [
			[0,1,2],
			[3,4,5],
			[6,7,8],
			[0,3,6],
			[1,4,7],
			[2,5,8],
			[0,4,8],
			[6,4,2],
		]

		existeVitoriaOuEmpate(){
			let xVence = null;
			let oVence = null;
            let _this = this;
		
			xVence = this.combinacoesDeVitoria.some((combinacoes) => {
                return combinacoes.every(el => arrMatrizes[el].textContent === 'x')
			})
            oVence = this.combinacoesDeVitoria.some((combinacoes) => {
                return combinacoes.every(el => arrMatrizes[el].textContent === 'o')
			})


            function verificaEmpate(){
                if(arrMatrizes.every(el => el.textContent !== '')){
                    alert('houve um empate');
                    _this.limparTabuleiro();		
                    return true;
                }
            }

            if(xVence){
                alert('X venceu!');
                numeroPlacarX++
                adicionaPlacar(placarX, numeroPlacarX)
                this.limparTabuleiro();
                return true
            }
            console.log(xVence);
            if(oVence){
                alert('O venceu!');
                numeroPlacarO++
                adicionaPlacar(placarO, numeroPlacarO)
                this.limparTabuleiro();
                return true
            }

            if(verificaEmpate()){
                return true;
            };
		}

		limparTabuleiro(){
			arrMatrizes.forEach(el => el.removeEventListener("click", this.disparaRodada))
			setTimeout(() => {
                    arrMatrizes.forEach(el => {
                        el.addEventListener("click", this.disparaRodada)
                        el.textContent = '';
                    });
			}, 1000)
		}

	}