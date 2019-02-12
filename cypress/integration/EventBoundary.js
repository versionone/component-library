context.only('EventBoundary', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, 'EventBoundary']);
  });

  specify('Specified events do not propagate past the EventBoundary', () => {
    cy.get('[data-test="childButton"]').click();
    cy.window().then(win => {
      expect(win.console.log).to.be.calledWith('child click');
      expect(win.console.log).to.not.be.calledWith('parent click');
    });
  });
});
