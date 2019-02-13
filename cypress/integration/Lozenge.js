context('Lozenge', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, /^Lozenge$/]);
  });

  specify('can optionally be bold', () => {
    cy.get('[data-component="Lozenge"]').as('sut');
    cy.get('@sut')
      .eq(0)
      .should('have.css', 'background-color', 'rgb(196, 202, 205)');
    cy.get('@sut')
      .eq(0)
      .should('have.css', 'background-color', 'rgb(196, 202, 205)');
    cy.get('@sut')
      .eq(5)
      .should('have.css', 'background-color', 'rgb(255, 255, 255)');
  });
});
