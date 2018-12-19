context('DirectStyleRule', () => {
  beforeEach(() => {
    cy.navigate('Styling', 'DirectStyleRule');
  });

  specify('style rules can be applied directly to child components', () => {
    return cy
      .get('[data-test="examples"]')
      .find('span')
      .first()
      .should('have.css', 'color', 'rgb(255, 127, 80)')
      .next()
      .should('have.css', 'color', 'rgb(128, 0, 128)');
  });

  specify('API documentation is included', () => {
    return cy
      .contains('h2', 'API')
      .next('[data-component="PropsTable"]')
      .should('exist');
  });
});
