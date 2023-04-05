///<reference types="cypress"/>

//importar direto do arquivo os comandos criados para serem usados especificamente neste arquivo de teste

//o locators serve como atalho para certo caminhos, para que fique mais légivel o código de onde está sendo clicado
//ou posto as informações

describe('Should test at a functional level', () => {
    // let token;

    before(() => {
        //como getToken é uma promisse, não é possível aloca-la diretamente em uma variável, mesmo que retorne o proprio token.
        //é preciso usar o then para entregar a promessa do token para uma variavel

        //após a sobreescrita do request e do getToken, nasceu o token como variavel global a

        cy.getToken('tc@teste.com', 'teste')
        // .then(tkn => {
        //     token = tkn
        // }) 
        
    })
    
    beforeEach(() => {
        cy.resetRest()
    })


    it("Shoul create an account", () => {
        
        //sem o token não consigo acesso ao contas, para poder fazer a requisição abaixo. Porem como a variavel 
        //token esta disponibilizada de forma global, o token pego em Authorization é esta
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: { 
                //Authorization: `JWT ${token}`
            },
            body: {
                    nome: 'Conta via rest'
            }
        }).as('response')
        //incluo um alias para fazer de uma forma diferente, pegando ele fora desta requisição
        //então aqui pego o response e faço as conferencias com métodos que não são do cypress
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest')
        })

    })

    it('Shoul update an account', () => {
        cy.getContaByName('Conta para alterar')
        .then(contaId => {
            cy.request({
                url: `/contas/${contaId}`,
                method: 'PUT',
                //headers: { Authorization: `JWT ${token}`},
                body: {
                    nome: 'Conta alterada via rest'
                }
                
            }).as('response')
            
        })

        //Não é possível ser feito pelo ID (40938) pq toda vez que se faz o reset, acaba alterando os ids das contas
        //para isso, primeiro pego a conta que quero alterar (GET e qs) e com o then, vou ter acesso ao id atual (res.body[0].id)
        //body é um array
    
        cy.get('@response').its('status').should('be.equal', 200)
    })


    it("Should not create an account with same name" , () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: { 
                //Authorization: `JWT ${token}`
            },
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
            //failOnStatusCode ele sendo false diz para o cypress que, mesmo que dê um status code diferente do esperado,
            //siga com os testes pois eu quero verificar melhor o erro e comparar com o que eu espero
            //por padrão o cypress logo que recebe um statuscode de 4xx a 5xx ele falha
        }).as('response')

        cy.get('@response').then(res => {
            console.log(res)
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal("Já existe uma conta com esse nome!")
        })
    })

    it("Should create a transaction" , () => {
        cy.getContaByName('Conta para movimentacoes')
        .then(contaId => {

            cy.request({
                method: 'POST',
                url: '/transacoes',
                //headers: { Authorization: `JWT ${token}`},
                body: {
                    conta_id: contaId,
                    data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'), 
                    data_transacao: Cypress.moment().format('DD/MM/YYYY'),//Cypress.moment() pega a data corrente
                    descricao: "Teste",
                    envolvido: "inter",
                    status: true,
                    tipo: "REC",
                    valor: "123"
                }
            }).as('response')

        })

        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')

    })

    it('Should get balance', () => {
        //estou checando o valor atual
        cy.request({
            url: '/saldo',
            method: 'GET',
            //headers: { Authorization: `JWT ${token}`}
        }).then(res => {
            let saldoConta = null
            
            res.body.forEach(c => {
                if(c.conta === 'Conta para saldo') saldoConta = c.saldo
            })

            expect(saldoConta).to.be.equal('534.00')
        })

        //modifico o valor atual da conta, passando para ativa
        cy.request({
            url: '/transacoes',
            method: 'GET', 
            //headers: { Authorization: `JWT ${token}`},
            qs: { descricao: 'Movimentacao 1, calculo saldo'}

        }).then(res => {

            cy.request({
                url:`/transacoes/${res.body[0].id}`,
                method: 'PUT',
                //headers: { Authorization: `JWT ${token}`},
                body: {
                    //parametros necessarios para preenchimento do body a ser enviado
                    status: true,
                    data_transacao: Cypress.moment(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: Cypress.moment(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id

                }
            }).its('status').should('be.equal', 200)
        })
        

        //revejo o valor para verificar se mudou
        cy.request({
            url: '/saldo',
            method: 'GET',
            //headers: { Authorization: `JWT ${token}`}
        }).then(res => {
            let saldoConta = null
            
            res.body.forEach(c => {
                if(c.conta === 'Conta para saldo') saldoConta = c.saldo
            })

            expect(saldoConta).to.be.equal('4034.00')
        })

    })

    it("Should remove a transaction", () => {
        cy.request({
            method: "GET",
            url:'/transacoes',
            // headers: { Authorization: `JWT ${token}` },
            qs:{ descricao: "Movimentacao para exclusao" }
        
        }).then(res => {
            cy.request({
            url: `/transacoes/${res.body[0].id}`,
            method: 'DELETE',
            // headers: { Authorization: `JWT ${token}` },

            }).its('status').should('be.equal', 204)
        })

    })
    
})


