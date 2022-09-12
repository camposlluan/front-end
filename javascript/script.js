
    function calcularMedia ( notas ) {
        
        var soma = 0;
        for ( c = 0; c < notas.length; c++){
            soma +=notas[c];
        }
        media = soma / notas.length;

        return media;
    }
    
    let media; // escopo global

    function aprovacao ( notas ) {

        let media = calcularMedia( notas ); // escopo da funcao

        let condicao = media >= 7 ? "aprovado" : "reprovado";

        return 'Media:' + media + '- ' + condicao;

    }

    // Console.log()

    //console.log( "Media: " + calcularMedia([8, 8, 7]))
    //console.log( aprovacao( calcularMedia(8, 8, 7) ) )
    console.log( aprovacao([8, 8, 7]) );

    //console.log( "Media: " + calcularMedia ([8, 8, 10, 6]))
    //console.log( aprovacao( calcularMedia(8, 8, 10, 6) ) )
    console.log( aprovacao([8, 8, 10, 6]) );
    //console.log( "Media: " + calcularMedia([9, 6]))
    //console.log( aprovacao(calcularMedia([9, 6]) ) )
    console.log( aprovacao([9, 6,]) );

/*
 * Formulario envio de dados para calculo da media
*/
const formulario1 = document.getElementById('formulario-01');

if(formulario1)
formulario1.addEventListener('submit', function( evento ){
    
    evento.preventDefault();
    evento.stopPropagation();

    if( this.getAttribute('class').match(/erro/) ) {
        return false;
    }
    
    let dados = new FormData(this);
    
    let notas = [];
    
    for(let key of dados.keys()) {

        let numero = dados.get(key).match(/\d*/) ? Number(dados.get(key)): 0 ; // e um numero

        console.log(numero);

        if(isNaN(numero)) {
            notas.push(numero);
        }

        
        // adicionar itens no array
        notas.push(parseInt(dados.get(key)));
    }
    console.log(notas);
    
    texto = aprovacao(notas)
    document.getElementById('resultado').innerHTML = texto;
});


function validaCampo(elemento){

 elemento.addEventListener('focusout', function(event) {

    event.preventDefault();

    if(this.value == ""){
        document.querySelector('.mensagem').innerHTML = "Verifique o preenchimento de campos em vermelho";
        this.classList.add('erro');
        this.parentNode.classList.add('erro');
        return false;
    } else {
        document.querySelector('.mensagem').innerHTML = ""
        this.classList.remove('erro');
        this.parentNode.classList.remove('erro');
    }
});

}

function validaCampoNumerico(elemento){

    elemento.addEventListener('focusout', function(event) {
   
        event.preventDefault();

        let numero = this.value(/^[\d]5-[\d]3/) ? this.value.replace(/-/, "") : this.value;
   
       if(numero != "" && numero.match(/[0-9]*/) && numero >= 0 && numero <= 10){
        document.querySelector('.mensagem').innerHTML = "";
        this.classList.remove('erro');
        this.parentNode.classList.remove('erro');
       } else {
        document.querySelector('.mensagem').innerHTML = "Verifique o preenchimento de campos em destaque";
        this.classList.add('erro');
        this.parentNode.classList.add('erro');
        return false;

       }
   });
}

function validaEmail(elemento){

    elemento.addEventListener('focusout', function(event) {
        event.preventDefault();

        const emailValido = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)$/i;
        if(this.value.match(emailValido)){
            document.querySelector('.mensagem').innerHTML = "";
            this.classList.remove('erro');
            this.parentNode.classList.remove('erro');
        } else {
            document.querySelector('.mensagem').innerHTML = "Verifique o preenchimento em destaque";
            this.classList.add('erro');
            this.parentNode.classList.add('erro');
            return false;
        }
    });
}


function validaUf(elemento){

    elemento.addEventListener('focusout', function(event) {
        event.preventDefault();
        
        const UfValido = /^[a-z]{2}$/i;
        if(this.value.match(UfValido)){
            document.querySelectorAll('.mensagem').innerHTML = "";
            this.classList.remove('erro');
            this.parentNode.classList.remove('erro');
        } else {
            document.querySelectorAll('.mensagem').innerHTML = "Verifique o preenchimento em destaque";
            this.classList.add('erro');
            this.parentNode.classList.add('erro');
            return false;
        }
        
     });
}

let camposObrigatorios = document.querySelectorAll('input.obrigatorio');
let camposNumericos = document.querySelectorAll('input.numero');
let camposEmail = document.querySelectorAll('input.email');
let camposUf = document.querySelectorAll('input.camposUf');

for (let emFoco of camposObrigatorios) {
    validaCampo(emFoco);
}

for (let emFoco of camposNumericos) {
    validaCampoNumerico(emFoco);
}

for (let emFoco of camposEmail) {
    validaEmail(emFoco);
}

for(let emFoco of camposUf) {
    validaUf(emFoco);
}