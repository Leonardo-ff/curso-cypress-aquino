/// <reference types="cypress"/>


describe('Work with alerts',() => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it.only('Alert',() => {
        // cy.get('#alert').click()
        
        // cy.on('window:alert',msg => {
        //      console.log(msg)
        //      expect(msg).to.be.equal('Alert Simples')
        // })

        cy.clickAlert('#alert', 'Alert Simples')
        //função criada no documento commands.js e server como um comando de auxilio
            
    })

    it('Alert com mock',() => {
        const stub = cy.stub().as('alerta')
        //o stub é um mock. Função as() é um apelido para a chamada.
        cy.on('window:alert',stub)
        //cy.on crio o alerta ('window:alert') e passo o stub como parametro, em vez de uma arrow

        //pego o botão Alert e clico e entao faço a validação, só que de forma diferente. O stub faz uma chamada
        // por isso utilizo getCall e ai então faço a verificação da mensagem
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
    })


    it('Confirm',() => {
        //cy.on é o evento que ocorre, que no caso são os popups abertos e seus tipo (confirm, alert, prompt)
        cy.on('window:confirm',msg => {
            expect(msg).to.be.equal('Confirm Simples')
            //aqui dentro de confirm, ele irá clicar automaticamente em SIM ou CONFIRMAR 
            //para não confirmar, usar return false
        })

        cy.on('window:alert',msg => {
            expect(msg).to.be.equal("Confirmado")
        })

        cy.get('#confirm').click()

    })

    it('Deny',() => {
        cy.on('window:confirm',msg => {
            expect(msg).to.be.equal('Confirm Simples')
            return false
            //com return false ele irá clicar em Cancelar
        })

        cy.on('window:alert',msg => {
            expect(msg).to.be.equal("Negado")
        })

        cy.get('#confirm').click()

    })


    it('Prompt',() => {
        //window retorna o objeto window da pagina, que permite gerenciar toda a pagina
        //para trabalhar com ele, é posto dentro de uma promisse, para tentar sobrescrever o comportamento
        // do prompt
        cy.window().then(win=>{
            cy.stub(win,'prompt').returns('42')
            //aqui é posto o objeto que será utilizado com o stub e então se passa qual comportamento
            //que será sobrescrito, que no caso é o prompt 
            // como é um metodo generico (stub) então é necessário utilizar o returns para dizer pro método o que ele deve fazer
        })

        cy.on('window:confirm',msg => {
            expect(msg).to.be.equal('Era 42?')
        })

        cy.on('window:alert',msg =>{
            expect(msg).to.be.equal(':D')
        })
        
        cy.get('#prompt').click()
    })
        
})