context('Switch', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, /^Switch$/]);
  });

  specify('Switches react to onClick events', () => {
    cy.get('[data-test="analytics"]')
      .find('[data-component="Switch"]')
      .click();

    cy.window().then(win => {
      expect(win.console.log).to.be.called.once;
    });
  });
});
