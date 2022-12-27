const operacaoAnteriorText = document.querySelector("#operacoes-anteriores");
const operacaoAtualText = document.querySelector("#operacoes-atuais");
const botoes =  document.querySelectorAll("#botoes button");

class Calculator{
    constructor(operacaoAnteriorText, operacaoAtualText){
        this.operacaoAnteriorText = operacaoAnteriorText;
        this.operacaoAtualText = operacaoAtualText;
        this.operacaoAtual= "";
        this.aux = "";

    }

    //adiciona digito para calcular
    addDigit(digit){
        //limita o uso de pontos desnecessários
        if(digit === "." && this.operacaoAtualText.innertext.include(".")){
            return;
        }
        this.operacaoAtual = digit;
        this.updateScreen()
    }

    //processa todas as operações 
    processOperation(operador){
        if(operacaoAtualText.innerText === ""){
            if(this.operacaoAnteriorText !== ""){
                this.mudaOperacao(operador)
            }
            return;
        }
        //getters
        let resultadoOperacao;
        const anteriores = +this.operacaoAnteriorText.innerText.split(" ")[0];
        const atuais = +this.operacaoAtualText.innerText;

        switch(operador){
            case '+':
                resultadoOperacao = anteriores + atuais;
                this.updateScreen( resultadoOperacao, operador, anteriores, atuais)
                break;
            case '-':
                resultadoOperacao = anteriores - atuais;
                this.updateScreen( resultadoOperacao, operador, anteriores, atuais)
                break;
            case '*':
                resultadoOperacao = anteriores * atuais;
                this.updateScreen( resultadoOperacao, operador, anteriores, atuais)
                break;
            case '/':
                resultadoOperacao = anteriores / atuais;
                this.updateScreen( resultadoOperacao, operador, anteriores, atuais)
                break;
            case 'DEL':
                this.processalDEL();
                break;
            case 'CE':
                this.processaCE();
                break;
            case 'C':
                this.processaC();
                break;
            case '=':
                this.processaIgual();
                break;
            default:
                return;
        }
    }

    updateScreen( resultadoOperacao = null, operador = null, anteriores = null, atuais = null){
        //console.log( resultadoOperacao, operador, anteriores, atuais)
        
        if(resultadoOperacao === null){
            this.operacaoAtualText.innerText += this.operacaoAtual;
        }else{
            if(anteriores === 0){
                resultadoOperacao = atuais;
            }

            this.operacaoAnteriorText.innerText = `${resultadoOperacao} ${operador}`
            this.operacaoAtualText.innerText = "";
        }
    }

    mudaOperacao(operadorr){
        const operacaoMatematica = ["*", "/", "+", "-"]

        if(!operacaoMatematica.includes(operadorr)){
            return;
        }

        this.operacaoAnteriorText.innerText = this.operacaoAnteriorText.innerText.slice(0, -1) + operadorr;
    }

    processaIgual(){
        const operador = operacaoAnteriorText.innerText.split(" ")[1];
        this.processOperation(operador);
    }

    processalDEL(){
        this.operacaoAtualText.innerText= this.operacaoAtualText.innerText.slice(0, -1)
    }

    processaCE(){
        this.operacaoAtualText.innerText = "";
    }

    processaC(){
        this.operacaoAnteriorText.innerText = "";
        this.operacaoAtualText.innerText = "";
    }

}

const calc = new Calculator(operacaoAnteriorText, operacaoAtualText);

botoes.forEach((btn) =>{
    btn.addEventListener("click", (e)=>{
        const value = e.target.innerText;
        
        if(+value >= 0 || value === "."){// o + converte os caracteres em numeros
            calc.addDigit(value)
        }else{
            calc.processOperation(value);
        }
    })
})