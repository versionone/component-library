context('Tabs', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, 'Tabs']);
  });

  specify('Tabs can have data-test attributes applied', () => {
    cy.get('[data-test="Tabs"]');
    cy.get('[data-test="Tabs.List"]');
    cy.get('[data-test="Tabs.Tab.1"]');
    cy.get('[data-test="Tabs.Tab.2"]');
    cy.get('[data-test="Tabs.Tab.3"]');
    cy.get('[data-test="Tabs.Panel.1"]');
    cy.get('[data-test="Tabs.Panel.2"]');
    cy.get('[data-test="Tabs.Panel.3"]');
  });

  specify('Only one tab can be selected at a time', () => {
    cy.get('[data-test="Tabs.Tab.1"]').click();
    cy.get('[data-test="Tabs.Tab.1"][aria-selected="true"]');
    cy.get('[data-test="Tabs.Tab.2"][aria-selected="false"]');
    cy.get('[data-test="Tabs.Tab.3"][aria-selected="false"]');

    cy.get('[data-test="Tabs.Tab.2"]').click();
    cy.get('[data-test="Tabs.Tab.1"][aria-selected="false"]');
    cy.get('[data-test="Tabs.Tab.2"][aria-selected="true"]');
    cy.get('[data-test="Tabs.Tab.3"][aria-selected="false"]');

    cy.get('[data-test="Tabs.Tab.3"]').click();
    cy.get('[data-test="Tabs.Tab.1"][aria-selected="false"]');
    cy.get('[data-test="Tabs.Tab.2"][aria-selected="false"]');
    cy.get('[data-test="Tabs.Tab.3"][aria-selected="true"]');
  });

  specify('Only one panel can be visible at a time', () => {
    cy.get('[data-test="Tabs.Tab.1"]').click();
    cy.get('[data-test="Tabs.Panel.2"]').should('have.css', 'display', 'none');
    cy.get('[data-test="Tabs.Panel.3"]').should('have.css', 'display', 'none');

    cy.get('[data-test="Tabs.Tab.2"]').click();
    cy.get('[data-test="Tabs.Panel.1"]').should('have.css', 'display', 'none');
    cy.get('[data-test="Tabs.Panel.3"]').should('have.css', 'display', 'none');

    cy.get('[data-test="Tabs.Tab.3"]').click();
    cy.get('[data-test="Tabs.Panel.1"]').should('have.css', 'display', 'none');
    cy.get('[data-test="Tabs.Panel.2"]').should('have.css', 'display', 'none');
  });

  specify('selecting a tab does not submit parent forms', () => {
    cy.get('form')
      .as('form')
      .then(form$ => {
        form$.on('submit', e => {
          e.preventDefault();
          expect(e).to.eql(null);
        });
      });
    cy.get('@form')
      .find('[data-test="Tabs.Tab.1"]')
      .focus()
      .click();
  });
});
