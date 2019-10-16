context('List', () => {
  beforeEach(() => {
    cy.navigate([/^Components$/, 'List']);
  });

  context('ListItem actions', () => {
    specify('1 or more ListItems can be selected', () => {
      const cerulean = 'rgba(0, 169, 224, 0.1)';

      cy.get('[data-test="list-item-selection"]')
        .find('[data-component="ListItem"]')
        .then(els =>
          cy.window().then(win => {
            const selectedCount = els
              .toArray()
              .reduce(
                (acc, el) =>
                  win.getComputedStyle(el).backgroundColor === cerulean
                    ? acc + 1
                    : acc,
                0,
              );
            expect(selectedCount).to.eql(2);
          }),
        );
    });

    specify(
      "ListItem's onClick handler is invoked when the list item is clicked",
      () => {
        cy.get('[data-test="list-item-actions"]')
          .find('[data-component="ListItem"]')
          .first()
          .click();
        cy.window().then(win =>
          expect(win.console.log).to.be.calledWith('ListItem click'),
        );
      },
    );

    specify(
      'Clicking on a secondary action or supporting visual element will not trigger the onClick handler for the ListItem',
      () => {
        cy.get('[data-test="list-item-actions"]')
          .find('[data-component="ListItem"]')
          .first()
          .contains('Secondary Action')
          .click();
        cy.window().then(win => {
          expect(win.console.log).to.not.be.calledWith('ListItem click');
          expect(win.console.log).to.be.calledWith('Secondary action click');
        });
        cy.get('[data-test="list-supporting-visual"]')
          .find('[data-component="ListItem"]')
          .find('[data-component="IconButton"]')
          .first()
          .click();
        cy.window().then(win => {
          expect(win.console.log).to.not.be.calledWith('ListItem click');
          expect(win.console.log).to.be.calledWith('Supporting visual click');
        });
      },
    );
  });

  context('Content lines', () => {
    specify('ListItemText can contain up to 3 lines of content', () => {
      cy.get('[data-test="list-supporting-visual"]')
        .find('[data-component="ListItem"]')
        .eq(2)
        .as('contentListItem');
      cy.get('@contentListItem')
        .contains('First line of content')
        .should('exist');
      cy.get('@contentListItem')
        .contains('Second line of content')
        .should('exist');
      cy.get('@contentListItem')
        .contains('Third line of content')
        .should('exist');
    });

    specify(
      'When providing a ListItemText with content that is too long, then the content is clamped to a single line',
      () => {
        cy.get('[data-test="list-content-too-long"]')
          .contains('span', 'Long second line of text.')
          .parents('div')
          .should('have.css', 'textOverflow', 'ellipsis')
          .should('have.css', 'overflow', 'hidden');
        cy.get('[data-test="list-content-too-long"]')
          .contains('span', 'Longsecondlineoftext.')
          .parents('div')
          .should('have.css', 'textOverflow', 'ellipsis')
          .should('have.css', 'overflow', 'hidden');
      },
    );
  });

  context('keyboard', () => {
    beforeEach(() => {
      cy.get('[data-test="list-focusable"]')
        .find('[data-component="ListItem"]')
        .as('listItems');
    });

    // TODO: This fails because D-14408 is not implemented.
    specify(
      'List items may be navigated via up/down arrow keys, cycling through list items and skipping those that are not focusable',
      () => {
        cy.get('@listItems')
          .first()
          .focus()
          .trigger('keydown', { key: 'ArrowUp' });
        cy.focused().should('contain', '4');
        cy.focused().trigger('keydown', { key: 'ArrowDown' });
        cy.focused().should('contain', '1');
        cy.focused().trigger('keydown', { key: 'ArrowDown' });
        cy.focused().trigger('keydown', { key: 'ArrowDown' });
        cy.focused().should('contain', '4');
      },
    );

    specify(
      'pressing Space/Enter key on a focused list item will activate its primary action',
      () => {
        cy.get('@listItems')
          .first()
          .focus()
          .trigger('keydown', { key: 'Enter' });
        cy.window().then(win => {
          expect(win.console.log).to.be.calledWith('ListItem 1 click');
        });

        cy.get('@listItems')
          .eq(1)
          .focus()
          .trigger('keydown', { key: ' ' });
        cy.window().then(win => {
          expect(win.console.log).to.be.calledWith('ListItem 2 click');
        });
      },
    );

    specify(
      "Pressing Enter/Space on a focused secondary/supporting visual will activate its action and not trigger the List Item's primary action",
      () => {
        cy.get('@listItems')
          .first()
          .contains('Secondary Action 1')
          .focus()
          .trigger('keydown', { key: 'Enter' }, { force: true });
        cy.get('@listItems')
          .eq(1)
          .contains('Secondary Action 2')
          .focus()
          .trigger('keydown', { key: 'Space' });
        cy.get('@listItems')
          .first()
          .find('[data-component="IconButton"]')
          .focus()
          .trigger('keydown', { key: 'Enter' });
        cy.get('@listItems')
          .eq(1)
          .find('[data-component="IconButton"]')
          .focus()
          .trigger('keydown', { key: 'Space' });
        cy.window().then(win => {
          expect(win.console.log).to.not.be.calledWith('ListItem 1 click');
          expect(win.console.log).to.not.be.calledWith('ListItem 2 click');
        });
      },
    );
  });

  context('Accessibility', () => {
    specify('List and list item have correct role attributes', () => {
      cy.get('[data-test="list-item-actions"]')
        .as('list')
        .should('have.attr', 'role', 'list');

      cy.get('@list')
        .find('[data-component="ListItem"]')
        .should('have.attr', 'role', 'listitem');
    });
  });

  context('Width', () => {
    specify('List does not exceed the width of its parent', () => {
      cy.get('[data-test="list-parent-width"]').should(
        'have.css',
        'width',
        '284px',
      );
    });
  });
});
