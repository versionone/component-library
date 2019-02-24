context('Popover', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, /^Popover$/]);
  });

  specify('can be positioned relative to an anchor', () => {
    cy.viewport(1920, 1080);
    const data = [
      { bottom: 557, left: 1067, right: 1116, top: 532 },
      { bottom: 616, left: 1080, right: 1102, top: 591 },
      { bottom: 761, left: 1108, right: 1139, top: 736 },
      { bottom: 877, left: 1054, right: 1075, top: 852 },
      { bottom: 964, left: 1076, right: 1106, top: 939 },
      { bottom: 1080, left: 1076, right: 1131, top: 1030 },
      { bottom: 1196, left: 1076, right: 1107, top: 1146 },
      { bottom: 1362, left: 1108, right: 1145, top: 1312 },
      { bottom: 1478, left: 1047, right: 1075, top: 1428 },
      { bottom: 1544, left: 1076, right: 1112, top: 1494 },
      { bottom: 1660, left: 1055, right: 1108, top: 1610 },
      { bottom: 1776, left: 1081, right: 1108, top: 1726 },
      { bottom: 1924, left: 1108, right: 1145, top: 1874 },
      { bottom: 2040, left: 1051, right: 1075, top: 1990 },
      { bottom: 2124, left: 1073, right: 1108, top: 2074 },
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
      cy.get('body').click();
      cy.get('[data-component="Popover"]').should('have.length', 15);
    },
  );
});
