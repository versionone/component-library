context('EmptyState', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, 'EmptyState']);
    cy.get('[data-component="EmptyState"]').as('sut');
  });

  specify('has a title', () => {
    cy.get('@sut')
      .eq(0)
      .find('h2')
      .should('exist');
  });

  specify('optional icon', () => {
    cy.get('@sut')
      .eq(3)
      .find('[data-component="Icon"]')
      .should('not.exist');

    cy.get('@sut')
      .eq(0)
      .find('[data-component="Icon"]')
      .should('exist');
  });

  specify('optional primary action', () => {
    cy.get('@sut')
      .eq(1)
      .find('[data-component="Button"]')
      .should('not.exist');

    cy.get('@sut')
      .eq(0)
      .find('[data-component="Button"]')
      .should('exist');
  });

  specify('optional additional guidance', () => {
    cy.get('@sut')
      .eq(2)
      .find('[data-component="SpacedGroup"] > div')
      .should('have.length', 3);

    cy.get('@sut')
      .eq(0)
      .find('[data-component="SpacedGroup"] > div')
      .should('have.length', 4);
  });
});
