context('Popover', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, /^Popover$/]);
  });

  specify('can be positioned relative to an anchor', () => {
    cy.viewport(1920, 1080);
    const data = [
      {
        x: 1068,
        y: 532,
        width: 49.46875,
        height: 25,
        top: 532,
        right: 1117.46875,
        bottom: 557,
        left: 1068,
      },
      {
        x: 1081,
        y: 591,
        width: 22.75,
        height: 25,
        top: 591,
        right: 1103.75,
        bottom: 616,
        left: 1081,
      },
      {
        x: 1109,
        y: 736,
        width: 31.671875,
        height: 25,
        top: 736,
        right: 1140.671875,
        bottom: 761,
        left: 1109,
      },
      {
        x: 1055,
        y: 852,
        width: 21.53125,
        height: 25,
        top: 852,
        right: 1076.53125,
        bottom: 877,
        left: 1055,
      },
      {
        x: 1077,
        y: 939,
        width: 30.625,
        height: 25,
        top: 939,
        right: 1107.625,
        bottom: 964,
        left: 1077,
      },
      {
        x: 1077,
        y: 1055,
        width: 84.921875,
        height: 25,
        top: 1055,
        right: 1161.921875,
        bottom: 1080,
        left: 1077,
      },
      {
        x: 1077,
        y: 1171,
        width: 58.296875,
        height: 25,
        top: 1171,
        right: 1135.296875,
        bottom: 1196,
        left: 1077,
      },
      {
        x: 1109,
        y: 1312,
        width: 66.71875,
        height: 25,
        top: 1312,
        right: 1175.71875,
        bottom: 1337,
        left: 1109,
      },
      {
        x: 1020,
        y: 1428,
        width: 56.5625,
        height: 25,
        top: 1428,
        right: 1076.5625,
        bottom: 1453,
        left: 1020,
      },
      {
        x: 1077,
        y: 1519,
        width: 66.1875,
        height: 25,
        top: 1519,
        right: 1143.1875,
        bottom: 1544,
        left: 1077,
      },
      {
        x: 1029,
        y: 1635,
        width: 80,
        height: 25,
        top: 1635,
        right: 1109,
        bottom: 1660,
        left: 1029,
      },
      {
        x: 1056,
        y: 1751,
        width: 53.390625,
        height: 25,
        top: 1751,
        right: 1109.390625,
        bottom: 1776,
        left: 1056,
      },
      {
        x: 1109,
        y: 1899,
        width: 61.796875,
        height: 25,
        top: 1899,
        right: 1170.796875,
        bottom: 1924,
        left: 1109,
      },
      {
        x: 1025,
        y: 2015,
        width: 51.65625,
        height: 25,
        top: 2015,
        right: 1076.65625,
        bottom: 2040,
        left: 1025,
      },
      {
        x: 1048,
        y: 2099,
        width: 61.265625,
        height: 25,
        top: 2099,
        right: 1109.265625,
        bottom: 2124,
        left: 1048,
      },
    ];
    cy.get('[data-component="Popover"]').then(els => {
      const rects = els.toArray().map(el => el.getBoundingClientRect());
      expect(JSON.stringify(data)).to.eql(JSON.stringify(rects));
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
