context('Label', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, 'Label']);
    cy.get('[data-component="Playground"] [data-component="Label"]').as('sut');
  });

  specify('can be marked as required or disabled', () => {
    cy.get('@sut')
      .eq(5)
      .should('have.text', 'required label *');

    cy.get('@sut')
      .eq(4)
      .should('have.css', 'cursor', 'not-allowed')
  });
});
