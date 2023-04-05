/// <reference types="cypress"/>

describe('Cyppress basics', () => {
    it.only('Should visit a page and assert title', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

        // const title=cy.title()
        //console.log(title)
        cy.title().should('be.equal','Campo de Treinamento')

        //debug para no navegador para verificar o que esta retornando a requisição da funcao
        //cy.title().should('contain','Campo').debug()

        cy.title()
            .should('be.equal','Campo de Treinamento')
            .and('contain','Campo')
            
        
        let syncTitle;    
        cy.title().then( title => {
            console.log(title)

            cy.get('#formNome').type(title)

            syncTitle = title;
        })
        
        cy.get('[data-cy=dataSobrenome]').then($el => {
            $el.val(syncTitle)
        })

        cy.get('#elementosForm\\:sugestoes').then($el => {
            cy.wrap($el).type(syncTitle)
        })
                                          
        
        //a diferença entre debug e pause é que com o pause voce pode ir passo a passo com o botao >| no cypress
    })


    it('Should find and interact with an element',() => {

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        // cy.get('nao exlate')
        //este get pode ser obtido pelo prorpio cypress, no seu navegador
        cy.get('#buttonSimple')
            .click()
            .should('have.value','Obrigado!')
    })


    
})