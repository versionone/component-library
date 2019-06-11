context('Stepper', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, /^Stepper$/]);
    cy.get('[data-component="Stepper"]').as('steppers');
  });

  specify(
    'steppers have steps with Icons and text',
    () => {
      cy.get('@steppers')
        .eq(0)
        .find('[data-component="Step"]')
        .eq(0)
        .children('div')
        .should('have.length', 2);
      cy.get('@steppers')
        .eq(1)
        .find('[data-component="Step"]')
        .eq(1)
        .children('div')
        .should('have.length', 2);
      cy.get('@steppers')
        .eq(4)
        .find('[data-component="Step"]')
        .eq(2)
        .children('div')
        .should('have.length', 2);
    },
  );
  specify(
    'steps do not require a description',
    () => {
      cy.get('@steppers')
        .eq(0)
        .find('[data-component="Step"]')
        .eq(0)
        .children('div')
        .eq(1)
        .children('div')
        .eq(1)
        .should('be.empty');
    }
  );
  specify(
    'steps without a description center the title',
    () => {
      cy.get('@steppers')
        .eq(0)
        .find('[data-component="Step"]')
        .eq(0)
        .children('div')
        .eq(1)
        .children('div')
        .eq(0)
        .should('have.css', 'top');
      cy.get('@steppers')
        .eq(4)
        .find('[data-component="Step"]')
        .eq(0)
        .children('div')
        .eq(1)
        .children('div')
        .eq(0)
        .should('have.css', 'top', '9px');
    }
  );

  specify(
    'steps can change the font-weight of the title',
    () => {
      cy.get('@steppers')
        .eq(8)
        .find('[data-component="Step"]')
        .eq(0)
        .children('div')
        .eq(1)
        .children('div')
        .eq(0)
        .should('have.css', 'font-weight', '700');
    }
  );
});
