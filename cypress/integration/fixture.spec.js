/// <reference types="cypress"/>

//povoar os testes com dados externos, acessar pasta fixture do projeto

describe('Fixtures tests',()=>{
    it('Get data form fixture file',function() {
        //utilizado funcition em vez de arrow devido a um problema com this
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.fixture('userData').as('usuario').then(( O => {
        //a funcao fixture consegue identificar a localidade do arquivo userData.json por estar no projeto
        // se não teria que indicar o caminho
            cy.get('#formNome').type(this.usuario.nome)
            cy.get('#formSobrenome').type(this.usuario.sobrenome)
            cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()
            cy.get(`[name=formComidaFavorita][value=${this.usuario.comida}]`).click()
            cy.get('#formEscolaridade').select(this.usuario.escolaridade)
            cy.get('#formEsportes').select(this.usuario.esportes)
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')

        }))

    })
})