Cypress.Commands.add('navigate', (subMenuName, pageName) => {
  cy.visit('/')
    .get('nav')
    .as('nav');
  if (subMenuName && pageName) {
    cy.get('@nav')
      .contains('a', subMenuName)
      .click();
    return cy
      .get('@nav')
      .contains(pageName)
      .click();
  }
  return cy
    .get('nav')
    .contains('a', subMenuName)
    .click();
});
