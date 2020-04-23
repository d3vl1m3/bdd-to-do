// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Can add a task to a list', () => {
    cy.visit('/');
    cy.get('.new-task-input')
        .type('A test task 1{enter}');

    cy.get('.task-list')
        .children('li')
        .should('have.length', 1);


    cy.get('.new-task-input')
        .type('{enter}') // should not add anything
        .type('null{enter}')
        .type('0{enter}')
        .type('false'); // should not add anything


    cy.get('.new-task-submit').click()

    cy.get('.task-list')
        .children('li')
        .should('have.length', 4);
  })
});
