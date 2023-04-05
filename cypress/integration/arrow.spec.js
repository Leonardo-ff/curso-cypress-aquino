
it('nada agora', function() {});


//function soma(a, b) {
//   return a + b;
//}

//const soma = (a, b) => {
//    return a + b;
//}

const soma = (a, b) => a + b;

console.log(soma(2,2))

it('a function test...' , function() {
    console.log('Function' , this)
})

it('an arrow test...',  () => {
    console.log('Arrow', this)
})