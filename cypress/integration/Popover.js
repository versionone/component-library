context('Popover', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, /^Popover$/]);
  });

  specify('can be positioned relative to an anchor', () => {
    cy.viewport(1920, 1080);
    const data = [
      { top: 419, right: 1061, bottom: 445, left: 861 },
      { top: 477, right: 1061, bottom: 503, left: 861 },
      { top: 622, right: 1177, bottom: 648, left: 977 },
      { top: 738, right: 945, bottom: 764, left: 745 },
      { top: 825, right: 1061, bottom: 851, left: 861 },
      { top: 999, right: 1145, bottom: 1025, left: 945 },
      { top: 1057, right: 1145, bottom: 1083, left: 945 },
      { top: 1199, right: 1177, bottom: 1225, left: 977 },
      { top: 1315, right: 945, bottom: 1341, left: 745 },
      { top: 1405, right: 1145, bottom: 1431, left: 945 },
      { top: 1521, right: 977, bottom: 1547, left: 777 },
      { top: 1637, right: 977, bottom: 1663, left: 777 },
      { top: 1785, right: 1177, bottom: 1811, left: 977 },
      { top: 1901, right: 945, bottom: 1927, left: 745 },
      { top: 1985, right: 977, bottom: 2011, left: 777 },
    ];

    cy.get('[data-component="Popover"]').then(els => {
      els
        .toArray()
        .map(el => el.getBoundingClientRect())
        .map(({ bottom, left, right, top }) => ({ bottom, left, right, top }))
        .forEach(({ bottom, left, right, top }, index) => {
          expect(bottom).to.be.closeTo(data[index].bottom, 3);
          expect(left).to.be.closeTo(data[index].left, 3);
          expect(right).to.be.closeTo(data[index].right, 3);
          expect(top).to.be.closeTo(data[index].top, 3);
        });
    });
  });

  specify(
    'onClickOutside event handlers fire when clicking an element outside the Popover',
    () => {
      cy.get('[data-test="event-handler"]')
        .as('playground')
        .find('[data-component="IconButton"]')
        .click();
      cy.get('[data-component="Popover"]').should('have.length', 16);
      cy.get('body').click({ force: true });
      cy.get('[data-component="Popover"]').should('have.length', 15);
    },
  );
});
