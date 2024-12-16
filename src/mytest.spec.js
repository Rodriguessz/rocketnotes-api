
//It(DescricaoTeste, callback) - Função utilizada para escrever um teste em jest.
it("Expected receive 2 numbers and the sum between bothr must be 4 ", () => {
    //Variables
    const a = 2;
    const b = 2;

    const result = a + b;

    //Expect - Função utilizada para verificar se o resultado esperado é igual ao resultado obtido.
    expect(result).toEqual(4);

});


