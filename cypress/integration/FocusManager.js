context('FocusManager', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, 'FocusManager']);
  });

  specify(
    'focusing an element and changing focus to a focus group can return focus to the original element',
    () => {
      cy.get(
        '[data-component="Playground"] [data-component="TextField"] input',
      ).as('sut');
      cy.get('@sut')
        .first()
        .focus();
      cy.get('@sut')
        .eq(3)
        .focus();
      cy.get('[data-component="Playground"] [data-component="Button"]').click();

      cy.get('@sut')
        .first()
        .then(el =>
          cy.focused().then(focusedEl => expect(el[0]).to.eql(focusedEl[0])),
        );
    },
  );
});
