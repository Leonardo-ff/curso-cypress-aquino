/// <reference types="cypress"/>


describe('Work with basic elements',() => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })
   
    it('Text',() => {
        
        cy.get('body').should('contain','Cuidado')
        // cy.get('body').should("have.text','Cuidado")
        cy.get('span').should('contain','Cuidado')
        //cy.get('div').should('contain','Cuidado')

        //classe facilAchar deve conter (should 'contain')
        cy.get('.facilAchar').should('contain','Cuidado')

        //classe(.) facilAchar tem (should, 'have.text) o texto
        cy.get('.facilAchar').should('have.text','Cuidado onde clica, muitas armadilhas...')
    }) 
    

    it('Links',() => {
        
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text','Voltou!')

        cy.reload()                                              
        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text','Voltou!')
    })

    it('TextFields',() => {
        cy.get('#formNome').type('Cypress Test')
        cy.get('#formNome').should('have.value','Cypress Test')

        cy.get('#elementosForm\\:sugestoes')
                .type('textarea')
                .should('have.value','textarea')

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
                .type('???')

        cy.get('[data-cy=dataSobrenome]')
                .type('Teste12345{backspace}{backspace}')
                .should('have.value','Teste123')
        //backspace entre chaves é o apagar do teclado

        cy.get('#elementosForm\\:sugestoes')
                .type('Erro{selectall}acerto', {delay: 100})//digitei Erro, selecionei toda palavra ({selectAll}) Erro e então substitui por acerto
                .should('have.value','acerto')
                .clear()

    
    })

    it('RadioButton',() => {
        cy.get('#formSexoFem')
                .click()
                .should("be.checked")

        cy.get('#formSexoMasc').should('not.be.checked')


        cy.get("[name=formSexo]").should('have.length',2) // deve ter tamanho igual a dois

    })

    it.only('Checkbox',() => {
        cy.get('#formComidaPizza')
            .click()
            .should("be.checked") //pega o elemento Pizza, clica e verifica se esta clicado

        // com o objeto passado em click, é acionando o clique em todos elementos do checkbox
        cy.get('[name=formComidaFavorita]').click({multiple:true}) 
        cy.get('#formComidaPizza').should('not.be.checked')
        cy.get('#formComidaVegetariana').should('be.checked')
            
    })

    it.only('Combo',() => {
        cy.get('[data-test=dataEscolaridade]')
                .select('2o grau completo')
                .should('have.value','2graucomp')
        // nos dois testes, acima e abaixo, é visto que o select pode buscar o valor que é mostrado,
        //assim como o valor que consta em value="1graucomp" da tag html        

        cy.get('[data-test=dataEscolaridade]')
            .select('1graucomp')
            .should('have.value','1graucomp')

        cy.get('[data-test=dataEscolaridade] option')
            .should('have.length',8)
        
        cy.get('[data-test=dataEscolaridade] option').then($arr => {
            //recebo uma lista de options da promisse e as jogo dentro de um array
            const values=[]
            $arr.each(function() {
                values.push(this.innerHTML)
            })
            
            //faço uma asserção, não pelo cypress, se o array contem dois itens
            expect(values).to.include.members(["Superior", "Mestrado"])
        })
        
    
    })

    it.only('Combo multiplo',() => {
        //em um combo que permite multiplas escolhas, utilizar o valor que consta em value='', em vez
        // do valor que aparece para o usuário
        cy.get('[data-testid=dataEsportes]')
            .select(['natacao','Corrida','nada'])

        cy.get('[data-testid=dataEsportes]').then($el => {
            expect($el.val()).to.be.deep.equal(['natacao','Corrida','nada'])
        })
        
        //o invoke captura diretamente a função val do elemento dataEspeortes e retorna um array
        
        cy.get('[data-testid=dataEsportes]').invoke('val').should('eql', ['natacao','Corrida','nada'])
    })
})