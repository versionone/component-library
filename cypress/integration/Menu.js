context('Menu', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, /^Menu$/]);
  });

  specify('can be opened', () => {
    cy.get('[data-component="IconButton"]')
      .first()
      .click();

    cy.get('#REACT_PORTAL')
      .find('[data-component="Menu"]')
      .should('exist');
  });

  specify('are positioned relative to their anchor when opened', () => {
    cy.get('[data-component="IconButton"]')
      .first()
      .click();

    cy.get('#REACT_PORTAL')
      .find('[data-component="Menu"]')
      .first()
      .then(el => {
        const { bottom, left, right, top } = el[0].getBoundingClientRect();
        expect(bottom).to.be.closeTo(259, 3);
        expect(left).to.be.closeTo(1171, 7);
        expect(right).to.be.closeTo(1371, 7);
        expect(top).to.be.closeTo(132, 3);
      });
  });

  specify('opening does not reset scroll position to top of page', () => {
    cy.get('[data-test="positioning"]')
      .find('[data-component="IconButton"]')
      .last()
      .scrollIntoView()
      .click();

    cy.window().then(win => expect(win.scrollY).to.not.eql(0));
  });

  specify('list item contents can be clicked without closing the menu', () => {
    cy.get('[data-component="IconButton"]')
      .first()
      .click();
    cy.get('#REACT_PORTAL')
      .find('[data-component="Menu"]')
      .find('[data-component="List.Item"]')
      .eq(1)
      .click();

    cy.get('#REACT_PORTAL')
      .find('[data-component="Menu"]')
      .should('exist');
  });

  specify(
    'menu items can be configured to be optionally contained within a Paper',
    () => {
      cy.get('[data-test="containment"]').as('playground');
      cy.get('@playground')
        .find('[data-component="IconButton"]')
        .first()
        .click();
      cy.get('[data-component="Menu"]')
        .find('[data-component="Paper"]')
        .should('not.exist');
    },
  );
});
