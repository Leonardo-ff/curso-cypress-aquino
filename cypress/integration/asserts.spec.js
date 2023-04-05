/// references type="cypress" />

it('Equality', () => {
    const a = 10;

    expect(a).equals(10);
    expect(a, 'Deveria ser 10').equals(10);
    //to.be.serve para deixar mais legivel
    expect(a).to.be.equals(10);
    expect(a).not.to.be.equals(9);
    
})


it('Truthy', () => {
    const a = true;
    const b= null;
    let c;

    expect(a).to.be.true;
    expect(true).to.be.true;
    expect(b).to.be.null;
    expect(a).not.to.be.null;
    expect(c).to.be.undefined;
})

it('Object Equality', () => {
    const obj = {
        a: 1,
        b: 2
    }

    expect(obj).equal(obj);
    expect(obj).equals(obj);
    expect(obj).eq(obj);
    expect(obj).to.be.equal(obj);
    //deep verifica mais a fundo um objeto nao explicito, mas caso não queria, pode usar só eql
    expect(obj).to.be.deep.equal({ a:1, b:2});
    expect(obj).to.be.eql({ a:1, b:2});
    //include verifica se objeto possui um propriedade e valor
    expect(obj).include({ b:2});

    expect(obj).to.have.property('b')
    expect(obj).to.have.property('b', 2)
    expect(obj).to.not.be.empty;

})

it('Arrays',() => {
    const arr = [1,2,3]
    expect(arr).to.have.members([1,2,3])
    expect(arr).to.include.members([1,3])
    expect(arr).to.not.be.empty
    expect([]).to.be.empty
})

it('Types',() => {
    const num = 1;
    const str ='String';

    expect(num).to.be.a("number")
    expect(str).to.be.a("string")
    expect({}).to.be.an("object")
    expect([]).to.be.an('array')
})

it('String', () => {
    const str = 'String de teste'

    expect(str).to.be.equal('String de teste')
    expect(str).to.have.length(15)
    expect(str).to.contains('de')
    //REGEX
    //se tem 'de'
    expect(str).to.match(/de/)
    //se começa com 'String'
    expect(str).to.match(/^String/)
    //se termina com 'testes'
    expect(str).to.match(/teste$/)
    //se o tamanho é de 15 carcteres
    expect(str).to.match(/.{15}/)
    //se não possui numero
    expect(str).to.match(/\w+/)
    //se só possui letras
    expect(str).to.match(/\D+/)

})

it('Numbers',() => {
    const number = 4
    const floatNumber = 5.2123

    expect(number).to.be.equal(4)
    expect(number).to.be.above(3)
    expect(number).to.be.below(7)
    expect(floatNumber).to.be.equal(5.2123)
    expect(floatNumber).to.be.closeTo(5.2,0.1)
    expect(floatNumber).to.be.above(5)

})