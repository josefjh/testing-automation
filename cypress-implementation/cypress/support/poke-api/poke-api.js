///	<reference types="cypress" />

// Consulta de Pokemon 
Cypress.Commands.add("pokeConsulta",(dato)=>{
    cy.request({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon/'+dato.data,
        failOnStatusCode: false
    })
    .then(res=>{res})
})
