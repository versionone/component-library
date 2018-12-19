context('StyleContainer', () => {
  beforeEach(() => {
    cy.navigate('Styling', 'StyleContainer');
  });

  specify(
    'components can be created and styled via the `createComponent` function',
    () => {
      return cy
        .get('[data-test="createComponent"]')
        .find('h3')
        .first()
        .should('have.css', 'background-color', 'rgb(173, 216, 230)')
        .next()
        .should('have.css', 'background-color', 'rgb(144, 238, 144)');
    },
  );
});
