const navigate = menuPath => {
  cy.visit('http://localhost:3000');
  cy.get('nav').as('nav');
  const clickPath = Array.isArray(menuPath) ? menuPath : [menuPath];
  clickPath.forEach(menuItem =>
    cy
      .get('@nav')
      .contains('a', menuItem)
      .click(),
  );
};

Cypress.Commands.add('navigate', navigate);
