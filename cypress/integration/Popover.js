context('Popover', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, /^Popover$/]);
  });

  specify(
    'onClickOutside event handlers fire when clicking an element outside the Popover',
    () => {
      cy.get('[data-test="event-handler"]')
        .as('playground')
        .find('[data-component="IconButton"]')
        .click();
      cy.get('[data-component="Popover"]').should('have.length', 16);
      cy.get('body').click({ force: true });
      cy.get('[data-component="Popover"]').should('have.length', 15);
    },
  );
});
