/// <reference types="cypress" />

describe('Our First Suite', () => {
  it('finds element', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    // By Tag Name
    cy.get('input');

    // By Id
    cy.get('#inputEmail1');

    // By Class Name
    cy.get('.input-full-width');

    // By Attribute Name
    cy.get('[placeholder="Email"]');

    // By Class Value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    // By Tag Name and Attribute With Value
    cy.get('input[placeholder="Email"]');

    // By Two Different Attributes
    cy.get('[placeholder="Email"][fullwidth]');

    // By Tag Name, Attribute with Value, ID and Class Name
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

    // The most recommended way by Cypress (creating your own attributes)
    cy.get('[data-cy="imputEmail1"]');
  });

  it.only('second test', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.get('[data-cy="signInButton"]');

    // Find first element that contains 'Sign in'
    cy.contains('Sign in');

    // Find element (second sign in button) containing 'Sign in' by its status
    cy.contains('[status="warning"]', 'Sign in');

    cy.get('#inputEmail3')
      .parents('form')
      .find('button')
      .should('contain', 'Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click();

    cy.contains('nb-card', 'Horizontal form').find('[type="email"]');
  });
});
