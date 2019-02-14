context('Border', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, /^Border$/]);
    cy.get('[data-component="Border"]').as('borders');
  });

  specify(
    'width, style, color, and radius can be controlled for the border',
    () => {
      cy.get('@borders')
        .eq(0)
        .should('have.css', 'border-color', 'rgb(196, 202, 205)')
        .should('have.css', 'border-style', 'solid')
        .should('have.css', 'border-width', '1px');
      cy.get('@borders')
        .eq(1)
        .should('have.css', 'border-color', 'rgb(0, 82, 147)')
        .should('have.css', 'border-style', 'dashed')
        .should('have.css', 'border-width', '5px')
        .should('have.css', 'border-radius', '10px');
    },
  );
  specify('borders can be disabled without a browser re-flow', () => {
    cy.get('@borders')
      .eq(2)
      .should('have.css', 'border-color', 'rgba(0, 0, 0, 0)')
      .should('have.css', 'border-width', '5px');
  });
});
