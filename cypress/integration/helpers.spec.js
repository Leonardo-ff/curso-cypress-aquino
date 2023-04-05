/// <reference types="cypress"/>

describe('Helpers ...',() =>{

    it('Wrap',() => {
        
        const obj={ nome:'User', idade:20 }

        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property','nome')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        // cy.get('#formNome').then($et => {
        // // $el.val('funciona via jquery')
        // cy.wrap($et).type('funciona via cypress')
    
        // })

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)

            }, 500)  
        }) 
    
        cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botão'))
        // promise.then(num => console.log(num)) //sendo auto gerenciado, o que acaba executando antes
        cy.wrap(promise).then(ret => console.log(ret)) //sendo gerenciado pelo cypress
        cy.get('#buttonList').then(() => console.log('Encontrei o segundo botão'))
    })    


    it.only('Its ...', () => {
        //its trabalha com as propriedades dos objetos
        const obj={nome:'User',idade:20}
        cy.wrap(obj).should("have.property",'nome','User')

        cy.wrap(obj).its('nome').should('be.equal', 'User')
        
        const obj2={
            nome:'User',
            idade:20,
            endereco:{rua:'dos bobos'}
        }
        cy.wrap(obj2).its('endereco').should('have.property','rua')
        cy.wrap(obj2).its('endereco').its('rua').should('contain','bobos')
        cy.wrap(obj2).its('endereco.rua').should('contain','bobos')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.title().its("length").should('be.equal',20)
        
    })


    it.only('Invoke...', () => {
        //invoke trabalha com funcão de um objeto
        const getValue = () => 1;
        const soma = (a, b) => a + b;

        cy.wrap( { fn: getValue} ).invoke('fn').should('be.equal', 1)
        cy.wrap( { fn: soma} ).invoke('fn', 1 , 2 ).should('be.equal', 3)


        cy.visit('https://wcaquino.me/cypress/componentes.html')
        //invoke tbm pode fazer o que o type faz, mas não vale a pena, melhor o type
        cy.get('#formNome').invoke('val','Texto via invoke')
        //dá pra criar um alert, mas não fica visível (até o momento do curso)
        cy.window().invoke('alert','Dá pra ver?')
        // é da para por um elemento html
        cy.get('#resultado')
            .invoke('html' , '<input type="button" value="hacked!"/>')
    })
    
})