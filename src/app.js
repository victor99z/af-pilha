const ap = require('./ap.json')

let palavras = "aabb,ab,aaabbb,abb"
palavras = palavras.split(",")

let pilha = ''

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
                            // remove item da pilha, exceto se for `e` (vazio)
                            pilha = pilha.slice(0,-1)
                            console.log(`remove ${transicao_aux[1]} da pilha, pilha atual: ${pilha}`)
                            }else{
                                return null
                            }
                        }
                        if(transicao_aux[2] != 'e'){
                            // Exibi as transicoes na tela.
                            console.log(`(${estado},${transicao_aux[0]},${transicao_aux[1]}) = {(${estado_externo}, ${transicao_aux[2]})}`)
                            // adiciona simbolo na pilha exceto se for `e` (vazio)
                            pilha += transicao_aux[2]
                            console.log(`add ${transicao_aux[2]} na pilha, pilha atual: ${pilha}`)
                            
                        }
                        if(pilha == '' && cont_letras.length == palavra.length){
                            return false;
                            break;
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
    for(i = 0; i < palavra.length; i++){
        cont_letras += palavra[i]
        if(testaLetra(palavra[i]) == false){
            console.log("Rejeita");
            break;
        }
        console.log("situaçao da fita: ",cont_letras)
        console.log("\n")
    }

    // Limpa a "pilha"
    pilha = ''
}

/** 
 * Pega o array de palavras e executa uma por uma.
 * 
*/

for(let palavra of palavras){
    testaPalavra(palavra)
    console.log("==========================================")
}