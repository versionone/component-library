context('SpacedGroup', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, /^SpacedGroup$/]);
  });

  specify('spaces items evenly (vertically or horizontally)', () => {
    cy.get('[data-component="Playground"]')
      .first()
      .find('[data-component="SpacedGroup"]')
      .find('[data-component="SpacedGroup"]')
      .first()
      .find('> *')
      .should('have.css', 'margin-top', '8px')
      .should('have.css', 'margin-right', '8px')
      .should('have.css', 'margin-bottom', '8px')
      .should('have.css', 'margin-left', '8px');
  });

  specify('can adjust spacing based on the viewport dimensions', () => {
    cy.get('[data-component="Playground"]')
      .eq(2)
      .find('[data-component="SpacedGroup"] > *')
      .should('have.css', 'margin-top', '24px')
      .should('have.css', 'margin-right', '24px')
      .should('have.css', 'margin-bottom', '24px')
      .should('have.css', 'margin-left', '24px');

    cy.viewport(600, 600);
    cy.get('[data-component="Playground"]')
      .eq(2)
      .find('[data-component="SpacedGroup"] > *')
      .should('have.css', 'margin-top', '8px')
      .should('have.css', 'margin-right', '8px')
      .should('have.css', 'margin-bottom', '8px')
      .should('have.css', 'margin-left', '8px');

    cy.viewport(400, 400);
    cy.get('[data-component="Playground"]')
      .eq(2)
      .find('[data-component="SpacedGroup"] > *')
      .should('have.css', 'margin-top', '0px')
      .should('have.css', 'margin-right', '0px')
      .should('have.css', 'margin-bottom', '0px')
      .should('have.css', 'margin-left', '0px');
  });
});
