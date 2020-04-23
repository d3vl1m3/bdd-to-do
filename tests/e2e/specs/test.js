// https://docs.cypress.io/api/introduction/api.html

function aliasTaskList() {
  cy.get('.task-list').as('taskList');
}

function initTaskListWithItems() {
  // button should always be disabled to start
  cy.get('@taskSortTrigger').should('be.disabled');

  // type out all the tasks required
  cy.get('@newTaskInput')
      .type('A test task 1{enter}')
      .type('{enter}') // should not add anything
      .type('null{enter}')
      .type('Zero{enter}')
      .type('false'); // should not add anything

  // add the last item via button click instead
  cy.get('@newTaskSubmit').click();

  aliasTaskList();

}

describe('Testing todo list', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.new-task-input').as('newTaskInput');
    cy.get('.new-task-submit').as('newTaskSubmit');
    cy.get('.task-sort-trigger').as('taskSortTrigger');
    // alias for list now available
    initTaskListWithItems();
  });

  it('Can add a task to a list', () => {
    // check the expected items are there
    cy.get('@taskList')
        .children('li')
        .should('have.length', 4);

  });

  it('Can remove a task from the list', () => {
    // click the delete icon on the 3rd item
    cy.get('@taskList')
        .children('li')
        .eq(2)
        .find('.task-item-close')
        .click();

    // length is updated
    cy.get('@taskList')
        .children('li')
        .should('have.length', 3);

    // item containing 0 no longer exists
    cy.get('@taskList')
        .children('li')
        .should('not.contain', '0');
  });

  it('The user can activate a prioritising event', () => {
    // a button for 'begin!' is no longer disabled
    cy.get('@taskSortTrigger')
        .should('not.be.disabled')
        // now lets trigger the sorting form to appear
        .click();

    // a form is now available
    cy.get('form.task-sorter')
        .as('taskSorter');

    // which asks the urgency/importance of each task
    cy.get('@taskSorter')
        .children('.sorting-task-question-container')
        .should('have.length', 4);

    // all "important" fields are there
    cy.get('@taskSorter')
        .find('fieldset')
        .eq(0) // grab the first fieldset
        .find('input[id^=important_]')
        .should('have.length', 5);

    // all "urgent" fields are there
    cy.get('@taskSorter')
        .find('fieldset')
        .eq(1) // grab the first fieldset
        .find('input[id^=urgency_]')
        .should('have.length', 5);
  });

  it('If a user adds a new task whilst prioritising, the task list replaces the form again', () => {
    // now lets trigger the sorting form to appear
    cy.get('@taskSortTrigger')
        .click();

    // a form is now available
    cy.get('form.task-sorter')
        .as('taskSorter');

    cy.get('@taskSorter')
        .should('exist');

    cy.get('@newTaskInput')
        .type('A test task 5{enter}');

    cy.get('@taskSorter')
        .should('not.exist');

    cy.get('@taskList')
        .should('exist')
        .children('li')
        .should('have.length', 5);
  });

  // it('When the user has done the sorting task, items are displayed in the correct order', () => {
  //
  // });
});
