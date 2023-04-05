/// <reference types="cypress"/>

describe('Esperas ...',() => {
    before(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })
    
    it('Deve aguardar elemento estar disponivel',() => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('Funciona')
    })

    it.only('Deve fazer retrys',() => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo')
            // .should('not.exist')
            .should('exist')
            .type('funciona')
    })

    it.only('Uso do find',() => {
        cy.get('#buttonListDOM').click()
        cy.get('#lista li')
            .find('span')
            .should('contain','Item 1')
        //cy.get('#ista li')
        //   .find('span')
        //   .should('contain',
        //Nas retentativas, o cypress irá buscar refazer o metodo anterior a metodo de assertiva.
        //O caso acima, comentado, não irá funcionar pois o escopo da busca, na "memória" do cypress
        // vai ficar limitado a primeira vez que se pesquisa por #lista li, não enxergando o próximo span item 2
        // Com o método abaixo, ele vai refazer a busca de uma forma mais específica e vai retentar até achar 
        // o span item2

        cy.get('#lista li span')
            .should('contain', 'Item 2')
  
    })

    it.only('Uso do timeout',() => {
        //cy.get('#buttonDelay').click()
         //cy.get('#novoCampo',{timeout:1000}).should('exist')
        cy.get('#buttonListDOM').click()
         
         //O WAIT irá esperar obrigatoriamente os 5000mls, mesmo que a aplicação de um retorno antes deste tempo
         //Já o timeout, ele espera até o tempo indicado, mas caso a aplicação de um retorno antes, ele aceita e
         //segue para a acertiva.

         //cy.wait(5000)
        cy.get('#lista li span',{timeout:30000})
            .should('contain','Item2')

        // cy.get('#buttonListDOM').click()
        // cy.get('#lista li span',{timeout:30000})
        //     .should('have.length',1)
        //     .should('have.length',2)
            
    })

    it.only('Click retry',() => {
        //toda ação que altere o html acaba que não funciona corretamente o retry do cypress
        cy.get('#buttonCount')
             .click()
             .click()
             .should('have.value','111')
    })


    it.only('Should vs Then',()=>{
        cy.get('#buttonListDOM').then($el => {
            // .should('have.length',1)
            // console.log($el)
            expect($el).to.have.length(1)
            cy.get('#buttonList')
        })
    })

    //se for necessário realizar novas buscas, deixar a pesquisa dentro de um bloco then

    //Estudar mais sobre as diferenças entre Shoul x Then
})