import { last } from 'lodash';

context('Breadcrumb', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, /^Breadcrumbs$/]);
    cy.get('[data-component="Breadcrumbs"]').as('breadcrumbs');
  });

  specify('breadcrumbs can be action-able via onClick event handlers', () => {
    cy.get('@breadcrumbs')
      .eq(0)
      .find('[data-component="SpacedGroup"] > span')
      .first()
      .click();
    cy.window(win => expect(win.console.log).to.be.calledWith('Home'));
  });
  specify(
    'breadcrumb items can be marked as selected to visually distinguish it from the other items',
    () => {
      cy.get('@breadcrumbs')
        .eq(0)
        .find('[data-component="SpacedGroup"] > span')
        .then(els => {
          const itemColors = els
            .toArray()
            .map(el => window.getComputedStyle(el).color);
          itemColors.slice(0, itemColors.length - 1).forEach(color => {
            expect(color).to.eql('rgb(196, 202, 205)');
          });
          expect(last(itemColors)).to.eql('rgb(49, 54, 62)');
        });
    },
  );
  specify('breadcrumbs can have custom separators', () => {
    cy.get('@breadcrumbs')
      .eq(3)
      .find('span')
      .contains('/')
      .should('not.exist');
    cy.get('@breadcrumbs')
      .eq(3)
      .find('span')
      .contains('>')
      .should('exist');
  });
  specify(
    'breadcrumb items can be marked as collapsed; showing an ellipsis instead of the item',
    () => {
      cy.get('@breadcrumbs')
        .eq(1)
        .find('[data-component="SpacedGroup"] > span')
        .eq(2)
        .should('contain', '...');
    },
  );
});
