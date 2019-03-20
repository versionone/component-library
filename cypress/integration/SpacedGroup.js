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

  specify('can adjust spacing based on the viewport dimensions (md)', () => {
    cy.get('[data-component="Playground"]')
      .eq(2)
      .find('[data-component="SpacedGroup"] > *')
      .should('have.css', 'margin-top', '24px')
      .should('have.css', 'margin-right', '24px')
      .should('have.css', 'margin-bottom', '24px')
      .should('have.css', 'margin-left', '24px');
  });

  context('can adjust spacing based on the viewport dimensions (sm)', () => {
    beforeEach(() => {
      cy.viewport(600, 600);
    });
    specify('can adjust spacing based on the viewport dimensions (sm)', () => {
      cy.wait(1000);
      cy.get('[data-component="Playground"]')
        .eq(2)
        .find('[data-component="SpacedGroup"] > *')
        .should('have.css', 'margin-top', '8px')
        .should('have.css', 'margin-right', '8px')
        .should('have.css', 'margin-bottom', '8px')
        .should('have.css', 'margin-left', '8px');
    });
  });

  context('can adjust spacing based on the viewport dimensions (xs)', () => {
    beforeEach(() => {
      cy.viewport(400, 400);
    });
    specify('can adjust spacing based on the viewport dimensions (xs)', () => {
      cy.wait(1000);
      cy.get('[data-component="Playground"]')
        .eq(2)
        .find('[data-component="SpacedGroup"] > *')
        .should('have.css', 'margin-top', '0px')
        .should('have.css', 'margin-right', '0px')
        .should('have.css', 'margin-bottom', '0px')
        .should('have.css', 'margin-left', '0px');
    });
  });
});
