context('Focusable', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, 'Focusable']);
  });

  specify('focus state is tracked and can be visually represented', () => {
    cy.get('[data-component="Playground"] input').as('inputs');
    cy.get('@inputs')
      .eq(1)
      .focus();

    cy.get('@inputs')
      .eq(0)
      .should('have.css', 'background-color', 'rgb(255, 255, 255)');
    cy.get('@inputs')
      .eq(1)
      .should('have.css', 'background-color', 'rgb(173, 216, 230)');
    cy.get('@inputs')
      .eq(1)
      .then(el =>
        cy.focused().then(focusedEl => expect(el[0]).to.eql(focusedEl[0])),
      );
  });
});
