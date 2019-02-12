context('Icons', () => {
  context('any icon', () => {
    beforeEach(() => {
      cy.navigate([/^Icons$/, /^Icon$/]);
      cy.get('[data-component="Icon"]').as('icons');
    });

    specify('can have a custom title applied', () => {
      cy.get('@icons')
        .eq(1)
        .should('have.attr', 'aria-labelledby', 'title')
        .find('title')
        .should('include.text', 'custom title');
    });
    specify('can be colored', () => {
      cy.get('@icons')
        .eq(2)
        .should('have.css', 'fill', 'rgb(0, 128, 0)');
    });
    specify('can be sized', () => {
      cy.get('@icons')
        .eq(3)
        .should('have.css', 'height', '48px')
        .should('have.css', 'width', '48px');
    });
  });

  specify('icons should not be double named; e.g SomethingIconIcon', () => {
    cy.navigate([/^Icons$/, /^By Name$/])
      .get('[data-component="Icon"]')
      .find('+ span')
      .should('not.contain', 'IconIcon');
  });
});
