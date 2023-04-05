/// <reference types="cypress"/>


describe('Work with basic elements',() => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })


    it('using jquery selector',() => {
        cy.get(":nth-child(1)>:nth-child(3)>[type='button']")
        cy.get("table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3)> input").click()
        cy.get("[onclick*=\'Francisco\']")
        //*= é a mesma coisa que contains
        cy.get("#tabelaUsuarios td:contains('Doutorado'):eq(0) ~ td:eq(3) > input ")
        //OU ir por linha (tr) "#tabelaUsuarios td:contains('Doutorado'):eq(0) td:eq(6) input"
    })


    10
   it('using xpath',() => {
        cy.xpath('// input[contains(@onclick,\'Francisco\')]')
        cy.xpath("//table[@id='tabelaUsuarios']/tbody/tr[contains(., 'Francisco')]/td[6]").type('Teste')
        cy.xpath("//*[@id='tabelaUsuarios']/tbody/tr[3]/td[6]/input").type('funciona')
    })

})