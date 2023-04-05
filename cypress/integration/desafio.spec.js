/// <reference types="cypress"/>

describe('Desafio 1', () => {
    //Botao, capturar mensagem
    //nome
    //botão, capturar mensagem
    //sobrenome
    //botão, capturar mensagem
    //sexo
    //botao e validar mensagem abaixo

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Botão - Mensagem Nome', () => {
        cy.get('#formCadastrar').click()

        cy.on('window:alert',msg => {
            expect(msg).to.be.equal("Nome eh obrigatorio")
        })
        
    })

    it('Cadastrar Nome', () => {
        cy.get('#formNome').type('Leonardo')
    })

    it('Botão - Mensagem Sobrenome', () => {
        cy.get('#formCadastrar').click()

        cy.on('window:alert',msg => {
            expect(msg).to.be.equal("Sobrenome eh obrigatorio")
        })
        
    })

    it('Cadastrar SobreNome', () => {
        cy.get('[data-cy=dataSobrenome]').type('Freitas')
    })

    it('Botão - Mensagem Sexo', () => {
        cy.get('#formCadastrar').click()

        cy.on('window:alert',msg => {
            expect(msg).to.be.equal("Sexo eh obrigatorio")
        })
        
    })

    it('Selecionar Sexo - Masculino', () => {
        cy.get('#formSexoMasc').click().should('be.checked')
    })

    it('Cadastrar final', () => {
        cy.get('#formCadastrar').click()

        cy.get('#resultado > :nth-child(1)').should('have.text', 'Cadastrado!')
    })
    
    //OU de forma mais sucinta, utilizando stub
    it.only('Validando mensagens',() => {
        const stub =  cy.stub().as('alerta')
        cy.on('window:alert', stub)

        cy.get('#formCadastrar').click()
                .then(() => expect(stub.getCall(0)).to.be.calledWith("Nome eh obrigatorio"))
        
        cy.get('#formNome').type('Wagner')

        cy.get('#formCadastrar').click()
                .then(() => expect(stub.getCall(1)).to.be.calledWith("Sobrenome eh obrigatorio"))

        cy.get('[data-cy=dataSobrenome]').type("Aquino")

        cy.get('#formCadastrar').click()
                .then(() => expect(stub.getCall(2)).to.be.calledWith("Sexo eh obrigatorio"))

        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()

        cy.get('#resultado>:nth-child(1)').should('contain','Cadastrado')
    })
})