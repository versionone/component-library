context('Drawer', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, 'Drawer']);
  });

  specify('clicking outside the drawer will close the drawer', () => {
    cy.contains('[data-component="Button"]', 'Left').click();
    cy.get('[data-component="Scrim"]').click();
    cy.get('[data-component="Drawer"]').should('not.exist');
  });

  specify(
    'drawer has appropriate, optional shadow applied based on its placement',
    () => {
      cy.contains('[data-component="Button"]', 'Left').click();
      cy.get('[data-component="Drawer"]').should(
        'have.css',
        'box-shadow',
        'rgba(0, 0, 0, 0.2) 0px 8px 10px -5px, rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.12) 0px 6px 30px 5px',
      );
      cy.get('[data-component="Scrim"]').click();

      cy.contains('[data-component="Button"]', 'Toggle Shadow').click();
      cy.contains('[data-component="Button"]', 'Left').click();
      cy.get('[data-component="Drawer"]').should(
        'have.css',
        'box-shadow',
        'none',
      );
    },
  );

  specify(
    'size is applied to the width or height appropriately based on the drawer placement',
    () => {
      cy.contains('[data-component="Button"]', 'Left').click();
      cy.get('[data-component="Drawer"]').should('have.css', 'width', '500px');
      cy.get('[data-component="Scrim"]').click();

      cy.contains('[data-component="Button"]', 'Right').click();
      cy.get('[data-component="Drawer"]').should('have.css', 'width', '500px');
      cy.get('[data-component="Scrim"]').click();

      cy.contains('[data-component="Button"]', 'Top').click();
      cy.get('[data-component="Drawer"]').should('have.css', 'height', '500px');
      cy.get('[data-component="Scrim"]').click();

      cy.contains('[data-component="Button"]', 'Bottom').click();
      cy.get('[data-component="Drawer"]').should('have.css', 'height', '500px');
    },
  );
});
