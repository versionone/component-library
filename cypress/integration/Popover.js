context('Popover', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, /^Popover$/]);
  });

  specify.only('can be positioned relative to an anchor', () => {
    cy.viewport(1920, 1080);
    const data = [
      { bottom: 557, left: 1067, right: 1116.46875, top: 532 },
      { bottom: 616, left: 1080, right: 1102.75, top: 591 },
      { bottom: 761, left: 1108, right: 1139.671875, top: 736 },
      { bottom: 877, left: 1054, right: 1075.53125, top: 852 },
      { bottom: 964, left: 1076, right: 1106.625, top: 939 },
      { bottom: 1080, left: 1076, right: 1160.921875, top: 1055 },
      { bottom: 1196, left: 1076, right: 1134.296875, top: 1171 },
      { bottom: 1337, left: 1108, right: 1174.71875, top: 1312 },
      { bottom: 1453, left: 1019, right: 1075.5625, top: 1428 },
      { bottom: 1544, left: 1076, right: 1142.1875, top: 1519 },
      { bottom: 1660, left: 1028, right: 1108, top: 1635 },
      { bottom: 1776, left: 1055, right: 1108.390625, top: 1751 },
      { bottom: 1924, left: 1108, right: 1169.796875, top: 1899 },
      { bottom: 2040, left: 1024, right: 1075.65625, top: 2015 },
      { bottom: 2124, left: 1047, right: 1108.265625, top: 2099 },
    ];

    cy.get('[data-component="Popover"]').then(els => {
      els
        .toArray()
        .map(el => el.getBoundingClientRect())
        .map(({ bottom, left, right, top }) => ({ bottom, left, right, top }))
        .forEach((rect, index) => {
          expect(rect).to.eql(data[index]);
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
