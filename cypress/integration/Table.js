context('Table', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, /^Table$/]);
    cy.get('[data-component="Table"]').as('Table');
  });

  specify('Table can have data-test attributes applied', () => {
    cy.get('[data-test="table"]');
    cy.get('[data-component="Table"]');
  });

  specify('Table displays all the row content and no Load More button', () => {
    cy.get('@Table').eq(0).children('div').should('have.length', 6);
    cy.get('@Table').eq(0).children('button').should('not.exist');
  });

  specify('Check table column header', () => {
    cy.get('@Table').eq(0).children('div').eq(0).children('span').should('have.length', 3);
    cy.get('@Table').eq(0).children('div').children('span').eq(0).should('have.text', 'Color');
    cy.get('@Table').eq(0).children('div').children('span').eq(1).should('have.text', 'Value');
    cy.get('@Table').eq(0).children('div').children('span').eq(2).should('have.text', 'Actions');
  });

  specify('Check table rows have provided columns', () => {
    cy.get('@Table').eq(0).children('div').eq(1).children('span').should('have.length', 3);
    cy.get('@Table').eq(0).children('div').eq(1).children('span').eq(2).get('Button').should('exist');
  });

  specify('Row action onClick handler to be called', () => {
    cy.get('@Table').eq(0).children('div').eq(2).children('span').eq(2).get('Button').eq(0).click();
    cy.window().then(win => expect(win.console.log).to.be.called.once);
  })

  specify('Check for paginated table', () => {
    cy.get('[data-test="paginated-table"]');
    cy.get('[data-component="Table"]');
  });

  specify('Table contains only specific row content', () => {
    cy.get('@Table').eq(1).children('div').should('have.length', 4);
    cy.get('@Table').eq(1).children('span').children('button').should('exist');
  });

  specify('Click on column name to sort', () => {
    cy.get('@Table').eq(1).children('div').children('span').eq(1).contains('Model').click();
    cy.get('@Table').eq(1).children('div').eq(1).children('span').eq(1).should('have.text', 'Maxima');
    cy.get('@Table').eq(1).children('div').eq(2).children('span').eq(1).should('have.text', 'Sentra');
    cy.get('@Table').eq(1).children('div').eq(3).children('span').eq(1).should('have.text', 'Skyline');
    cy.get('@Table').eq(1).children('div').children('span').eq(1).contains('Model').click();
    cy.get('@Table').eq(1).children('div').eq(1).children('span').eq(1).should('have.text', 'Skyline');
    cy.get('@Table').eq(1).children('div').eq(2).children('span').eq(1).should('have.text', 'Sentra');
    cy.get('@Table').eq(1).children('div').eq(3).children('span').eq(1).should('have.text', 'Maxima');
  });

  specify('Click Load more button', () => {
    cy.get('@Table').eq(1).get('button').contains('Load More').click();
    cy.get('@Table').eq(1).children('div').should('have.length', 7);
    cy.get('@Table').eq(1).get('button').contains('Load More').click();
    cy.get('@Table').eq(1).children('div').should('have.length', 9);
    cy.get('@Table').eq(1).children('button').should('not.exist');
  });
})
