const navigate = menuPath => {
  cy.visit('http://localhost:3000');
  cy.get('nav').as('nav');
  const clickPath = Array.isArray(menuPath) ? menuPath : [menuPath];
  return clickPath.reduce(
    (acc, menuItem) =>
      acc
        .get('@nav')
        .contains('a', menuItem)
        .click(),
    cy,
  );
};

Cypress.Commands.add('navigate', navigate);
