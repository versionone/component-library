context('ScrollableContainer', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, /^ScrollableContainer$/]);
    cy.get('[data-component="ScrollableContainer"]').as('sut');
  });

  // Not sure how to test pseudo elements with cypress
  specify.skip('scroll bar shows when there is scrollable content', () => {
    cy.get('[data-component="ScrollableContainer"]::-webkit-scrollbar')
      .first()
      .should('have.css', 'height', '0')
      .should('have.css', 'width', '8px');
    cy.get('[data-component="ScrollableContainer"]::-webkit-scrollbar-thumb')
      .first()
      .should('have.css', 'border-color', 'rgba(255, 255, 255)')
      .should('have.css', 'border-style', 'solid')
      .should('have.css', 'border-width', '1px 2px 1px 1px')
      .should('have.css', 'border-radius', '3px')
      .should('have.css', 'background-color', 'rgb(196, 202, 205)');
    cy.get('[data-component="ScrollableContainer"]::-webkit-scrollbar-track')
      .first()
      .should('have.css', 'background-color', 'rgba(255, 255, 255)');
  });

  specify('makes containers scrollable based on a height and/or width', () => {
    cy.get('@sut')
      .first()
      .should('have.css', 'max-height', '100px')
      .should('have.css', 'overflow-y', 'auto');
    cy.get('@sut')
      .eq(1)
      .should('have.css', 'width', '100px')
      .should('have.css', 'max-height', '100%')
      .should('have.css', 'overflow-x', 'hidden');
  });
});
