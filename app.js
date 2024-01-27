let listaNumeroSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirTextoInicial() {
    exibirTextoNaTela('h1','Jogo do número secreto');
    exibirTextoNaTela('p','Escolhe um número entre 1 e 10')
}

exibirTextoInicial();
function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1','Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; 
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        document.getElementById('reiniciar').removeAttribute('disabled');
        
        exibirTextoNaTela('p', mensagemTentativa);
    } else {
        if (chute > numeroSecreto) {
        exibirTextoNaTela('p','O número secreto é menor');
        } else {
        exibirTextoNaTela('p','O número secreto é maior');
        }
    tentativas++;
    limparCampo();
    }
} 

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);    
    let quantidadeDeElementosNaLista = listaNumeroSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite) {
        listaNumeroSorteados = [];
    }
    if (listaNumeroSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumeroSorteados.push(numeroEscolhido);
        console.log(listaNumeroSorteados)
        return numeroEscolhido;
    }

}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    exibirTextoInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}