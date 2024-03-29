/// <reference types="cypress" />

import{Given, When, Then} from '@badeball/cypress-cucumber-preprocessor'

// Declaración de variables iniciales para api-interop
var variable = 0 


// SECCIÓN GIVEN

    // Corresponde a carga de datos para búsqueda de pokémons
Given('Quiero consultar la información para un pokémon',()=>{
    cy.fixture(`data-pokeapi/data_consultas.json`).then(get_data => { this.data = get_data })
})

Given('La búsqueda la realizo por {string}',(metodo)=>{
    if(metodo=='id'){
        variable=0;
    }
    else if(metodo=='nombre'){
        variable=1;
    }
    else if(metodo=='nombre-errado'){
        variable=2;
    }
    else if(metodo=='numero-errado'){
        variable=3;
    }
})


// SECCIÓN WHEN

    // Corresponde a la consulta a la API
When('Ejecuto la consulta al endpoint',()=>{
    cy.pokeConsulta(this.data[variable]).as('response')
    cy.get('@response').then(res=>{cy.writeFile('cypress/fixtures/data-pokeapi/poke-info.json',res.body)})
})


// SECCIÓN THEN

    // Corresponde a la consulta a la API
        // Utilizado para verificar: ID, nombre, experiencia_base
    Then('Confirmo que el {string} es {string}',(field,word)=>{
       cy.get('@response').then( data=>{
            expect(data.body).to.include.keys(
                'abilities',
                'base_experience',
                'forms',
                'game_indices',
                'height',
                'held_items',
                'id',
                'is_default',
                'location_area_encounters',
                'moves',
                'name',
                'order',
                'past_abilities',
                'past_types',
                'species',
                'sprites',
                'stats',
                'types',
                'weight'
            )
        })
        //if(field=='id'){word.parseInt()}
        cy.get('@response').its('body.'+field).should('eq',word)
    })

        // Utilizado para verificar el tipo y la habilidad
    Then('Confirmo que su {string} es {string}',(a,b)=>{
        if (a=='tipo'){
            cy.get('@response').its('body.types[0].type.name').should('eq',b)
            }
        else if (b=='habilidad'){
            cy.get('@response').its('body.abilities[0].ability.name').should('eq',b)
            }
        })

