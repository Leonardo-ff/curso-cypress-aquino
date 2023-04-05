///<reference types="cypress"/>

import loc from '../../support/locators.js'

import '../../support/commandsContas'
//importar direto do arquivo os comandos criados para serem usados especificamente neste arquivo de teste

//o locators serve como atalho para certo caminhos, para que fique mais légivel o código de onde está sendo clicado
//ou posto as informações

describe('Should test at a functional level', () => {

    before(() => {
        cy.login('tc@teste.com', 'teste')
        cy.resetApp()
        //funcões criadas no commands
    })

    // beforeEach(() => {
    //     cy.get(loc.MENU.HOME).click()
    // })


    it("Shoul create an account", () => {

        cy.acessarMenuConta()
        cy.inserirConta('Conta de Teste 123')

        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })

    it('Shoul update an account', () => {
        cy.acessarMenuConta()

        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()

        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
    })

    it("Should not create an account with same name" , () => {
        cy.acessarMenuConta()

        cy.get(loc.CONTAS.NOME).type("Conta mesmo nome")
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should("contain", "code 400")
    })

    it("Should create a transaction" , () => {
        cy.get(loc.MENU.MOVIMENTACAO).click();

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()

        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
    })

    it.only('Should get balance', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        //cy.wait(2000)
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.MENU.HOME).click()
        cy.get(loc.MENU.MOVIMENTACAO).click()

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')

    })

    it("Should remove a transaction", ()=>{
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO("Movimentacao para exclusao")).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })
    
})


