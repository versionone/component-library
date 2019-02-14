context('Clamp', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, 'Clamp']);
  });

  specify('Content can be clamped to a single line', () => {
    cy.get('[data-test="clamp-text"]')
      .should('have.css', 'height', '28px')
      .should('have.css', 'width', '750px')
      .should('have.css', 'text-overflow', 'ellipsis')
      .should('have.css', 'overflow', 'hidden')
      .should('have.css', 'white-space', 'nowrap');
  });
});
