context('Scrim', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, /^Scrim$/]);
  });

  specify('block entire page from interaction', () => {
    cy.get('[data-component="Button"]')
      .first()
      .click();
    cy.get('[data-component="Button"]')
      .eq(1)
      .click();
    cy.on('fail', ({ message }) => {
      expect(message).to.include('cy.click() failed because this element');
      expect(message).to.include('is being covered by another element');
    });
  });
});
