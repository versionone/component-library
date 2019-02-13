context('Divider', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, 'Divider']);
    cy.get('[data-component="Divider"]').as('dividers');
  });

  specify('render a visual divider', () => {
    cy.get('@dividers')
      .eq(0)
      .should('have.css', 'height', '1px')
      .should('have.css', 'background-color', 'rgba(0, 0, 0, 0.08)')
      .should('have.css', 'border-style', 'none')
      .should('have.css', 'border-width', '0px');
  });
  specify('can have a heavy weight', () => {
    cy.get('@dividers')
      .eq(2)
      .should('have.css', 'background-color', 'rgba(0, 0, 0, 0.2)');
  });
  specify('can have left and right borders', () => {
    cy.get('@dividers')
      .eq(3)
      .should('have.css', 'border-left', '24px solid rgb(255, 0, 0)')
      .should('have.css', 'border-right', '24px solid rgb(255, 0, 0)');
  });
});
