const Stack = require('@datastructures-js/stack')
const ap = require('./ap.json')

let palavra = "aabb,ab,aaabbb,abb"
palavra = palavra.split(",")

transicoes = {
    "q0": {}
}

class Transition{
    Transition(estado_atual, proximo_estado, simbolo_fita, add_pilha,remove_pilha){
        this.estado_atual = estado_atual
        this.proximo_estado = proximo_estado
        this.simbolo_fita = simbolo_fita
        this.add_pilha = add_pilha
        this.remove_pilha = remove_pilha
    }
}

function testa_palavra(word){
    
    ap.transicoes.map( transicoes => {
        console.log(transicoes)
    })

}

testa_palavra(palavra[0])
