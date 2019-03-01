context('Paper', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, /^Paper$/]);
    cy.get('[data-component="Playground"] [data-component="Paper"]').as('sut');
  });

  specify('has elevation', () => {
    cy.get('@sut')
      .first()
      .should(
        'have.css',
        'box-shadow',
        'rgba(0, 0, 0, 0.2) 0px 1px 5px 0px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px',
      );
  });

  specify('can be square or rounded', () => {
    cy.get('@sut')
      .first()
      .should('have.css', 'border-radius', '4px');
    cy.get('@sut')
      .eq(1)
      .should('have.css', 'border-radius', '0px');
  });
});
