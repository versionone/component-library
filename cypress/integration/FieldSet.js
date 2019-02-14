context('FieldSet', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, 'FieldSet']);
  });

  specify('form fields are visually grouped together', () => {
    cy.get('[data-component="FieldSet"]')
      .find('> div')
      .should('have.css', 'border-left-color', 'rgb(196, 202, 205)')
      .should('have.css', 'border-left-style', 'solid')
      .should('have.css', 'border-left-width', '4px')
      .should('have.css', 'width', '12px');
  });
});
