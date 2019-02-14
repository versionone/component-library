context('Menu', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, /^Menu$/]);
  });

  specify('can be opened', () => {
    cy.get('[data-component="IconButton"]')
      .first()
      .click();

    cy.get('#REACT_PORTAL')
      .find('[data-component="Menu"]')
      .should('exist');
  });

  specify(
    'clicking outside an open menu closes the menu and returns focus to element that triggered it to open',
    () => {
      cy.get('[data-component="IconButton"]')
        .as('button')
        .first()
        .click();
      cy.get('body').click();

      cy.get('#REACT_PORTAL')
        .find('[data-component="Menu"]')
        .should('not.exist');
      cy.get('@button').then(el =>
        cy.focused().then(focusedEl => expect(el[0]).to.eql(focusedEl[0])),
      );
    },
  );

  specify(
    'menu items can be configured to be optionally contained within a Paper',
    () => {
      cy.get('[data-test="containment"]').as('playground');
      cy.get('@playground')
        .find('[data-component="IconButton"]')
        .first()
        .click();
      cy.get('[data-component="Menu"]')
        .find('[data-component="Paper"]')
        .should('not.exist');
    },
  );

  specify(
    'menu can configured to not have a Scrim; will never invoke onClickOutside event handler',
    () => {
      cy.get('[data-test="containment"]').as('playground');
      cy.get('@playground')
        .find('[data-component="IconButton"]')
        .eq(1)
        .click();
      cy.get('body').click();
      cy.get('[data-component="Menu"]').should('exist');
    },
  );
});
