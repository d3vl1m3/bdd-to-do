// https://docs.cypress.io/api/introduction/api.html

function aliasTakList() {
  cy.get('.task-list').as('taskList');
}

describe('Testing todo list', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.get('.new-task-input').as('newTaskInput');
    cy.get('.new-task-submit').as('newTaskSubmit');
  });

  it('Can add a task to a list', () => {
    cy.visit('/');
    cy.get('@newTaskInput')
        .type('A test task 1{enter}');

    aliasTakList();

    cy.get('@taskList')
        .children('li')
        .should('have.length', 1);


    cy.get('@newTaskInput')
        .type('{enter}') // should not add anything
        .type('null{enter}')
        .type('0{enter}')
        .type('false'); // should not add anything


    cy.get('@newTaskSubmit').click();

    cy.get('@taskList')
        .children('li')
        .should('have.length', 4);
  });

  it('Can remove a task from the list', () => {
    cy.visit('/');

    cy.get('@newTaskInput')
        .type('A test task 1{enter}')
        .type('{enter}') // should not add anything
        .type('null{enter}')
        .type('0{enter}')
        .type('false'); // should not add anything

    cy.get('.new-task-submit').click();

    aliasTakList();

    cy.get('@taskList')
        .children('li')
        .should('have.length', 4);

    cy.get('@taskList')
        .children('li')
        .eq(2)
        .find('.task-item-close')
        .click();

    cy.get('@taskList')
        .children('li')
        .should('have.length', 3);

    cy.get('@taskList')
        .children('li')
        .should('not.contain', '0'); // this was at index pos 2
  })
});
