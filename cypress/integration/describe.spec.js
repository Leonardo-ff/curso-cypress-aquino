/// references types="cypress" />


//it é para um teste especifico
it('A external test...', () => {

})

/* it.only('A unic test ...', () => {
    //only é para executar somente um teste
}) */

//describe é para agrupamento de testes
describe('Should group tests...', () => {
    describe('Should group more specifics tests...', () => {
        it.skip('A specific test...', () => {
            //skip pula um teste, não o executa
        })
    })

    describe('Should group more specifics tests...', () => {
        it('A specific tes2t...', () => {

        })
    })

    it('A internal test...', () => {

    })

})