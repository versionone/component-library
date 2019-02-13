context('Link', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, /^Link$/]);
  });

  specify('can be configured to open in a new window', () => {
    cy.window(win => cy.spy(win, 'open'));
    cy.contains('a', 'Open in new tab or window')
      .as('sut')
      .click();
    cy.get('@sut')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer');
  });
});
