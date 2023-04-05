/// <reference types="cypress"/>


describe('Work with Popup',() => {
    
    // it('Deve preencher campo de texto', () => {
    //     cy.visit('https://wcaquino.me/cypress/componentes.html')
    //     cy.get('#otherButton').click()

    //     cy.on('window:alert', msg => {
    //         expect(msg).to.be.equal('Click Ok!')
    //     })

    // })


    it("Deve verificar seopopup foi invocado",() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        
        cy.window().then(win => {
           cy.stub(win,'open').as("winOpen")
           //stub verifica e apelida por mocks
           //por causa do stub, janela não é mais aberta
        })

        cy.get('#buttonPopUp').click()
        cy.get('@winOpen').should('be.called')//o @ acaba pegando o alias do stub acima
    })

    describe('With Links ...',() => {
        beforeEach(() => {
            cy.visit('https://wcaquino.me/cypress/componentes.html')
        })

        it('Check popup url',() => {
            cy.contains("Popup2")
                 .should('have.prop','href')
                 .and('equal','https://wcaquino.me/cypress/frame.html')
        })         
        
        it('Should access popup dinamically',() => {
            cy.contains('Popup2').then($a => {
                // peguei o elemento link e visiteu o atributo href para pegar seu valor (link destino)
                const href = $a.prop('href')
                cy.visit(href)
                cy.get('#tfield').type('funciona')
            })
        })

        it('Should force link on same page', () => {
            cy.contains('Popup2')
                .invoke('removeAttr', 'target')
                .click()
            cy.get('#tfield').type('funciona2')
        })
    })
})