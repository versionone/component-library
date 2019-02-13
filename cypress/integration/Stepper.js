context('Stepper', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, /^Stepper$/]);
    cy.get('[data-component="Playground"]').as('playgrounds');
  });

  specify('can be horizontal or vertical', () => {
    cy.get('@playgrounds')
      .first()
      .find('[data-component="Stepper"]')
      .first()
      .find('> *')
      .should('have.css', 'flex-direction', 'column');

    cy.get('@playgrounds')
      .eq(1)
      .find('[data-component="Stepper"]')
      .first()
      .find('[data-component="Step"] > *')
      .should('have.css', 'flex-direction', 'row');
  });
  specify('can be small or normal size', () => {
    cy.get('@playgrounds')
      .first()
      .find('[data-component="Stepper"]')
      .first()
      .find('[data-component="Step"]')
      .should('have.css', 'height', '60px');
    cy.get('@playgrounds')
      .eq(2)
      .find('[data-component="Stepper"]');
  });
  specify(
    'Steps can have titles, description, icon, status, has it been seen, and is it the current step',
    () => {},
  );
});
