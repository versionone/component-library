context('PLACEHOLDER', () => {
  beforeEach(() => {
    cy.visit('/packages/PLACEHOLDER');
  });

  specify(
    'component renders',
    () => {
      return cy.get('[data-component="PLACEHOLDER"]');
    },
  );
});
