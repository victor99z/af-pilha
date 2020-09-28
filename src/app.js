




function verifica(event){
    event.preventDefault()

    /**
     * Recebe o json contendo o AP e faz o parse para map, assim podemos trabalhar com o json dentro do js
     *  Recebe tambem o array de palavras que serão verificadas
    */

    document.querySelector("#resultado_af").innerHTML = ''
    ap = document.querySelector('#json').value
    palavras = document.querySelector('#palavras').value    
    ap = JSON.parse(ap)
    palavras = palavras.split(",")

    let pilha = ''

    /** 
     * Pega o array de palavras e executa uma por uma.
     * 
    */

    for(let palavra of palavras){
        testaPalavra(palavra)
        console.log("==========================================")
    } 
}


// Tudo que está com document.querySelector() é referente ao html, para poder escrever no front-end as atualizaçoes

function testaLetra(letra){
    for(let transicao of ap.transicoes){
        for(let estado of ap.estados){
            for(let estado_externo of ap.estados){
                try{
                    /** 
                     * salva a transicao em um formato de array
                     * 
                     * [0] - se refere ao simbolo da fita
                     * [1] - se refere a leitura da pilha
                     * [2] - item para adicionar na pilha
                     * 
                     */
                    transicao_aux = transicao[estado][estado_externo]
                    transicao_aux = transicao_aux.split(',')
                
                    if(letra == transicao_aux[0] || letra == 'e'){
                        if(transicao_aux[1] != 'e' ){
                            if(pilha != ''){
                            // Exibi as transicoes na tela.
                            console.log(`(${estado},${transicao_aux[0]},${transicao_aux[1]}) = {(${estado_externo}, ${transicao_aux[2]})}`)
                            document.querySelector("#resultado_af").innerHTML += `<h8> (${estado},${transicao_aux[0]},${transicao_aux[1]}) = {(${estado_externo}, ${transicao_aux[2]})} </h8><br>`
                            // remove item da pilha, exceto se for `e` (vazio)
                            pilha = pilha.slice(0,-1)
                            console.log(`remove ${transicao_aux[1]} da pilha, pilha atual: ${pilha}`)
                            document.querySelector("#resultado_af").innerHTML += `<h8> remove ${transicao_aux[1]} da pilha, pilha atual: ${pilha} </h8><br>`
                            }else{
                                return null
                            }
                        }
                        if(transicao_aux[2] != 'e'){
                            // Exibi as transicoes na tela.
                            console.log(`(${estado},${transicao_aux[0]},${transicao_aux[1]}) = {(${estado_externo}, ${transicao_aux[2]})}`)
                            document.querySelector("#resultado_af").innerHTML += `<h8> (${estado},${transicao_aux[0]},${transicao_aux[1]}) = {(${estado_externo}, ${transicao_aux[2]})} </h8><br>`
                            // adiciona simbolo na pilha exceto se for `e` (vazio)
                            pilha += transicao_aux[2]
                            console.log(`adiciona ${transicao_aux[2]} na pilha, pilha atual: ${pilha}`)
                            document.querySelector("#resultado_af").innerHTML += `<h8> adiciona ${transicao_aux[2]} na pilha, pilha atual: ${pilha} </h8><br>`
                        }
                        
                    }
                }catch(error){
                    // Try catch para situacao em que o loop nao consegue acessar alguma transicao
                }
                
            }
        }
    }
}


/**
 * Função para varrer todas as letras da palavra dada e verificar as transicoes
 */

function testaPalavra(palavra){
    let cont_letras = ''
    let cont_aux = 0 // Variavel auxiliar para contar quantas vezes a pilha ficou vazia.

    /** 
     * Percorre a cadeia de caracteres da palavra testando cada caracter
    */

    document.querySelector("#resultado_af").innerHTML += `<h4> Palavra sendo verificada : <i>${palavra}</i></h4>`

    for(i = 0; i < palavra.length; i++){
        cont_letras += palavra[i]
        console.log("situaçao da fita: ",cont_letras)
        document.querySelector("#resultado_af").innerHTML += `<h6> Situaçao da fita : <i>${cont_letras}</i></h6>`
        if(testaLetra(palavra[i]) === null){
            cont_aux++;
        }
    }

    /** 
     * no final a pilha sempre fica vazia, por isso -1, caso seja 0 entao a palavra é aceita.
     * se nao é rejeitada
    */

    if(cont_aux-1 <= 0){
        console.log("aceita")
        document.querySelector("#resultado_af").innerHTML += `<h6><b>Palavra aceita<b>✔</h6>`
    }else{
        console.log("rejeita")
        document.querySelector("#resultado_af").innerHTML += `<h6><b>Palavra Rejeitada<b>😢</h6>`
    }

    // Limpa a "pilha"
    pilha = ''
}

