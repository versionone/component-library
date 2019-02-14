context('Hidden', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, 'Hidden']);
  });

  specify('content can be hidden from screen or from screen readers', () => {
    cy.get('[data-component="Playground"]').as('playgrounds');
    cy.get('@playgrounds')
      .first()
      .find('[aria-hidden="false"]')
      .should('have.css', 'display', 'none')
      .should('have.css', 'visibility', 'hidden');
    cy.get('@playgrounds')
      .eq(1)
      .find('[aria-hidden="true"]')
      .should('not.have.css', 'display', 'none')
      .should('not.have.css', 'visibility', 'hidden');
  });
});
