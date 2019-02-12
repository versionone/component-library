context('Badge', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, /^Badge$/]);
    cy.get('[data-component="Badge"]').as('badges');
  });

  specify(
    'badges can either show: no count value when 0, 0 (when configured to show zero), or a count value',
    () => {
      cy.get('@badges')
        .eq(0)
        .find('span')
        .should('not.exist');
      cy.get('@badges')
        .eq(1)
        .find('span')
        .should('contain', '0');
      cy.get('@badges')
        .eq(2)
        .find('span')
        .should('contain', '50');
      cy.get('@badges')
        .eq(3)
        .find('span')
        .should('contain', '+99');
    },
  );
  specify('badges can optionally have children', () => {
    cy.get('@badges')
      .eq(0)
      .find('[data-component="Icon"]')
      .should('exist');
    cy.get('@badges')
      .eq(4)
      .find('[data-component="Icon"]')
      .should('not.exist');
    cy.get('@badges')
      .eq(4)
      .find('span')
      .should('contain', '12');
  });

  specify('can be colored', () => {
    cy.get('@badges')
      .eq(8)
      .find('span')
      .should('have.css', 'background-color', 'rgb(9, 168, 76)');
    cy.get('@badges')
      .eq(9)
      .find('span')
      .should('have.css', 'background-color', 'rgb(255, 255, 255)')
      .should('have.css', 'color', 'rgb(0, 0, 0)');
    cy.get('@badges')
      .eq(10)
      .find('span')
      .should('have.css', 'background-color', 'rgb(0, 82, 147)')
      .should('have.css', 'color', 'rgb(255, 255, 255)');
  });

  specify(
    'always has a transparent border unless overridden to have borders',
    () => {
      cy.get('@badges')
        .eq(8)
        .find('span')
        .should('have.css', 'border-color', 'rgba(0, 0, 0, 0)')
        .should('have.css', 'border-width', '1px')
        .should('have.css', 'border-style', 'solid');
      cy.get('@badges')
        .eq(9)
        .find('span')
        .should('have.css', 'border-color', 'rgb(0, 0, 0)')
        .should('have.css', 'border-width', '1px')
        .should('have.css', 'border-style', 'solid');
    },
  );
});
