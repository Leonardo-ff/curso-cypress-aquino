///<reference types="cypress"/>


describe('Dinamic tests', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    // beforeEach(() => {
    //     cy.reload()
    // })

    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']

    foods.forEach(food => {

        it(`Cadastro com a comida '${food}' `, () => {
            cy.get('#formNome').type('Usuario')
            cy.get('#formSobrenome').type('Qualquer')
            cy.get(`[name=formSexo][value=F]`).click()
            cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).click()
            cy.xpath('//*[@id="formEscolaridade"]').select('Doutorado')
            cy.get('#formEsportes').select('Corrida')
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')

        })
    })

    it.only('Deve selecionar todas as comidas usando each', () => {
        cy.get('#formNome').type('Usuario')
        cy.get('#formSobrenome').type('Qualquer')
        cy.get(`[name=formSexo][value=F]`).click()

        cy.get('[name=formComidaFavorita]').each(el => {
            //$el.click() poderia ser feito desta maneira, porem se perde a rastreabilidade do click no cypress
            //então melhor transforma-lo em um item gerenciavel pelo cypress atraves do wrap()
            if( el.val() != 'vegetariano') {
                cy.wrap(el).click()
            }
        })

        cy.get('#formEscolaridade').select('Doutorado')
        cy.get('#formEsportes').select('Corrida')
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        // cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
    })



})    