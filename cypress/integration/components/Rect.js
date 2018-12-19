context('Rect', () => {
  beforeEach(() => {
    cy.navigate('Utilities', 'Rect');
  });
  specify.only(
    'the dimensions of an element can be retrieved by consuming components',
    () => {
      cy.contains('"x": 722').should('exist');
      cy.contains('"y": 374').should('exist');
      cy.contains('"width": 740').should('exist');
      cy.contains('"height": 98').should('exist');
      cy.contains('"top": 374').should('exist');
      cy.contains('"right": 1462').should('exist');
      cy.contains('"bottom": 472').should('exist');
      cy.contains('"left": 722').should('exist');

      cy.viewport(500, 500);
      cy.contains('"x": 82').should('exist');
      cy.contains('"y": 430').should('exist');
      cy.contains('"width": 305').should('exist');
      cy.contains('"height": 126').should('exist');
      cy.contains('"top": 430').should('exist');
      cy.contains('"right": 387').should('exist');
      cy.contains('"bottom": 556').should('exist');
      cy.contains('"left": 82').should('exist');
    },
  );
});
