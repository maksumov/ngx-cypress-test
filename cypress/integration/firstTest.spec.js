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

  it('second test', () => {
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

  it.only('then and wrap methods', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    // Original approach
    // cy.contains('nb-card', 'Using the Grid')
    //   .find('[for="inputEmail1"]')
    //   .should('contain', 'Email');
    // cy.contains('nb-card', 'Using the Grid')
    //   .find('[for="inputPassword2"]')
    //   .should('contain', 'Password');

    // cy.contains('nb-card', 'Basic form')
    //   .find('[for="exampleInputEmail1"]')
    //   .should('contain', 'Email address');
    // cy.contains('nb-card', 'Basic form')
    //   .find('[for="exampleInputPassword1"]')
    //   .should('contain', 'Password');

    // Selenium way (doesn't work)
    // const firstForm = cy.contains('nb-card', 'Using the Grid');
    // const secondForm = cy.contains('nb-card', 'Basic form');

    // firstForm.find('[for="inputEmail1"]').should('contain', 'Email');
    // firstForm.find('[for="inputPassword2"]').should('contain', 'Password');
    // secondForm
    //   .find('[for="exampleInputEmail1"]')
    //   .should('contain', 'Email address');
    // secondForm
    //   .find('[for="exampleInputPassword1"]')
    //   .should('contain', 'Password');

    // Cypress style
    cy.contains('nb-card', 'Using the Grid').then((firstForm) => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
      const passwordLabelFirst = firstForm
        .find('[for="inputPassword2"]')
        .text();

      expect(emailLabelFirst).to.equal('Email');
      expect(passwordLabelFirst).to.equal('Password');

      cy.contains('nb-card', 'Basic form').then((secondForm) => {
        // secondForm is JQuery object
        const passwordLabelSecond = secondForm
          .find('[for="exampleInputPassword1"]')
          .text();
        // so we should use assertions with expect (Chai style)
        expect(passwordLabelSecond).to.equal(passwordLabelFirst);

        // cy.wrap() method let use Cypress.Chainable methods with JQuery objects
        // so we could use .should()
        cy.wrap(secondForm)
          .find('[for="exampleInputPassword1"]')
          .should('contain', 'Password');
      });
    });
  });
});
