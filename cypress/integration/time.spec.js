///<reference types="cypress"/>


describe('Dinamic tests', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it("Going back to the past", () => {
        // cy.get("#buttonNow").click()
        // cy.get('#resultado>span').should( 'contain', '16/08/2022')
        
        // cy.clock()
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain', '31/12/1983')

        //com o clock eu seto uma data para ser utilizada pelo navegador com um variavel que representa a data buscada.
        
        const dt = new Date(2012, 3, 10, 15, 23, 50) //aqui o mês é indexado em 0, com isso 3=Abril
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '10/04/2012')

    })


    it.only("Goes to the future" , () => {
        cy.get("#buttonTimePassed" ).click()
        cy.get('#resultado > span' ).should('contain', 166)
        cy.get('#resultado > span' ).invoke("text").should("gt", 166067)

        //o clock zera o relogio, caso não seja passado nenhuma parametro
        cy.clock()
        cy.get("#buttonTimePassed" ).click()
        cy.get('#resultado > span' ).invoke("text").should("lte", 0)
        // cy.wait(5000) 
        // cy.get("#buttonTimePassed" ).click()
        // cy.get('#resultado > span' ).invoke("text").should("gte", 5000)


        cy.tick(5000) //é tipo um mock do clock, que passa 5s pra frente (5000 mls)
        cy.get("#buttonTimePassed" ).click()
        cy.get('#resultado > span' ).invoke("text").should("gte", 5000)
        
        cy.tick(10000) //é tipo um mock do clock, que passa 5s pra frente
        cy.get("#buttonTimePassed" ).click()
        cy.get('#resultado > span' ).invoke("text").should("gte", 15000)
        
    })

    

})