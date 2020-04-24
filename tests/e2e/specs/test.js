// https://docs.cypress.io/api/introduction/api.html
function initTaskListWithItems() {
    // button should always be disabled to start
    cy.get('@taskSortTrigger').should('be.disabled');

    // type out all the tasks required
    cy.get('@newTaskInput')
        .type('true{enter}')
        .type('1{enter}')
        .type('{enter}') // should not add anything
        .type('null{enter}')
        .type('0{enter}')
        .type('false'); // should not add anything

    // add the last item via button click instead
    cy.get('@newTaskSubmit').click();

}

function attemptToTriggerSortingUi() {
    // a button for 'begin!' is no longer disabled
    cy.get('@taskSortTrigger')
        .should('not.be.disabled')
        // now lets trigger the sorting form to appear
        .click();

    // a form is now available
    cy.get('form.task-sorter').as('taskSorter')
        .should('exist');
}

describe('Testing todo list', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('.new-task-input').as('newTaskInput');
        cy.get('.new-task-submit').as('newTaskSubmit');
        cy.get('.task-sort-trigger').as('taskSortTrigger');
        // alias for list now available
        initTaskListWithItems();

        cy.get('.task-list').as('taskList');
    });

    it('User can add and remove items from the task list', () => {
        cy.get('@taskList')
            .children('li')
            .should('have.length', 5);

        // make sure the item containing '0' exists
        cy.get('@taskList')
            .children('li')
            .should('contain', '0');

        // click the delete icon on the 3rd item
        cy.get('@taskList')
            .children('li')
            .contains('0') // get the specific item with 0 in it's content
            .find('.task-item-close')
            .click();

        // length is updated
        cy.get('@taskList')
            .children('li')
            .should('have.length', 4);

        // item containing 0 no longer exists
        cy.get('@taskList')
            .children('li')
            .should('not.contain', '0');
    });

    it('The user can prioritise their tasks', () => {
        attemptToTriggerSortingUi();

        // which asks the urgency/importance of each task
        cy.get('@taskSorter')
            .children('.sorting-task-question-container')
            .should('have.length', 5);

        // all "important" fields are there
        cy.get('@taskSorter')
            .get('li').as('taskSortingFields')
            .first()
            .find('input[id^=important_], input[id^=urgent_]')
            .should('have.length', 10);

        // select one on each radio group
        cy.get('@taskSortingFields')
            .each(($el, index) => {
                // click the radio buttons that matches the index (or the last one)
                cy.wrap($el)
                    .find('input[name^=important_]')
                    .eq(index)
                    .click();
                cy.wrap($el)
                    .find('input[name^=urgent_]')
                    .eq(index < 4 ? index : 4)
                    .click();
            });

        // make sure the form is gone
        cy.get('@taskSorter')
            .submit()
            .should('not.exist');

        // the ordered list should now be visible
        cy.get('.sorted-list').as('@sortedList')
            .should('be.visible')
            .children('li')
            .first()
            .contains('false');

        // item at the top should be the last item that was originally entered
    });
});
