/// <reference types="cypress"/>


describe('Work with iFrames',() => {
    
    it('Deve preencher campo de texto', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        //pego o iframe e jogo em uma promisse
        cy.get('#frame1').then(iframe => {
            //preciso pegar no iframe o elementos body, já que iframes são outras paginas html em um bloco menor
            const body = iframe.contents().find("body")

            //tranformo este body para ser gerenciado pelo cypress (wrap)
            cy.wrap(body).find('#tfield')
                    .type('funciona?')
                    .should('have.value','funciona?')
            
            // cy.on('window:alert', msg => {
            //     expect(msg).to.be.equal('Alert Simples')
            // })

            // cy.wrap(body).find('#otherButton').click()
        })

    })

    it('Deve testar frame diretamente',() => {
        cy.visit('https://wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        cy.on('window:atert',msg => {
             expect(msg).to.be.equal('Click OK')
        })
    })
    
})