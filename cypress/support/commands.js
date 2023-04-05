// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import loc from './locators'

Cypress.Commands.add('clickAlert', (locator, message) => {
    cy.get(locator).click()
        
    cy.on('window:alert',msg => {
        console.log(msg)
        expect(msg).to.be.equal(message)
    })
})


Cypress.Commands.add("login", (user, passwd) => {
    cy.visit('https://barrigareact.wcaquino.me/')
    //importado o locators para facilitar o uso
    cy.get(loc.LOGIN.USER).type(user)
    cy.get(loc.LOGIN.PASSWORD).type(passwd)
    cy.get(loc.LOGIN.BTN_LOGIN).click()
    cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
})


Cypress.Commands.add('resetApp', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.RESET).click()
})


Cypress.Commands.add('getToken', (user, passwd) => {
    //url /signin pq no cypress.json foi posto a url base
    cy.request({
        method: 'POST',
        url: '/signin',
        body: { 

            email: user,
            redirecionar: false,
            senha: passwd
        }
        //eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MzEzMDV9
        //com o .then( res => console.log(res)) eu imprimo a resposta no console do cypress para poder
        //pegar o token que este em body/token. Com token em mãos, posso fazer uma validação com
        //o its e should (abaixo)
    }).its('body.token').should('not.be.empty')
    .then(token => {
        //cypress.env() eu crio uma variavel de ambiente padrão
        Cypress.env('token', token)
        return token
    })
})


Cypress.Commands.add('resetRest', () => {
    cy.getToken('tc@teste.com', 'teste')
    .then(token => {
        cy.request({
            method: 'GET',
            url: '/reset',
            headers: { Authorization: `JWT ${token}` }
        }).its('status').should('be.equal', 200)

    })
})


Cypress.Commands.add("getContaByName", name => {
    cy.getToken('tc@teste.com', 'teste').then(token => {
        
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            qs:{
                nome: name
            }

        }).then(res => {
            //console.log(res)
            return res.body[0].id

        })
    })  
}) 


Cypress.Commands.overwrite('request', (originalFn, ...options) => {
    if(options.length === 1) {
        if(Cypress.env('token')){
            options[0].headers = {
                Authorization: `JWT ${Cypress.env('token')}`
                
            }
        }
    }

    return originalFn(...options)
})