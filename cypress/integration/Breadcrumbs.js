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
