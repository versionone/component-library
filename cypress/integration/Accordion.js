context('Accordion', () => {
  beforeEach(() => {
    cy.navigate(['Components', 'Accordion']);
  });

  specify('Accordion accepts data attributes', () => {
    cy.get('[data-component="Accordion"]');
    cy.get('[data-test="Accordion-default"]');
  });

  specify('Only one panel can be open at a time', () => {
    cy.get(
      '[data-test="Accordion-default"] [data-test="Accordion-Header-1"]',
    ).click();
    cy.get(
      '[data-test="Accordion-default"] [data-test="Accordion-Header-1"] [aria-expanded="true"]',
    );
    cy.get(
      '[data-test="Accordion-default"] [data-test="Accordion-Header-2"] [aria-expanded="false"]',
    );

    cy.get(
      '[data-test="Accordion-default"] [data-test="Accordion-Header-2"]',
    ).click();
    cy.get(
      '[data-test="Accordion-default"] [data-test="Accordion-Header-2"] [aria-expanded="true"]',
    );
    cy.get(
      '[data-test="Accordion-default"] [data-test="Accordion-Header-1"] [aria-expanded="false"]',
    );
  });

  specify('One panel must be open at all times', () => {
    cy.get(
      '[data-test="Accordion-default"] [data-test="Accordion-Header-1"]',
    ).click();
    cy.get(
      '[data-test="Accordion-default"] [data-test="Accordion-Header-1"] [aria-expanded="true"]',
    );

    cy.get(
      '[data-test="Accordion-default"] [data-test="Accordion-Header-1"]',
    ).click();
    cy.get(
      '[data-test="Accordion-default"] [data-test="Accordion-Header-1"] [aria-expanded="true"]',
    );
  });

  specify(
    'Many panels can be open at the same time when applying manyExpandable',
    () => {
      cy.get(
        '[data-test="Accordion-manyexpandable"] [data-test="Accordion-Header-1"]',
      ).click();
      cy.get(
        '[data-test="Accordion-manyexpandable"] [data-test="Accordion-Header-2"]',
      ).click();

      cy.get(
        '[data-test="Accordion-manyexpandable"] [data-test="Accordion-Header-1"] [aria-expanded="true"]',
      );
      cy.get(
        '[data-test="Accordion-manyexpandable"] [data-test="Accordion-Header-2"] [aria-expanded="true"]',
      );
    },
  );

  specify('All panels can be closed when applying allCollapsable', () => {
    cy.get(
      '[data-test="Accordion-allcollapsable"] [data-test="Accordion-Header-1"] [aria-expanded="false"]',
    );
    cy.get(
      '[data-test="Accordion-allcollapsable"] [data-test="Accordion-Header-2"] [aria-expanded="false"]',
    );

    cy.get(
      '[data-test="Accordion-allcollapsable"] [data-test="Accordion-Header-1"]',
    )
      .click()
      .click();
    cy.get(
      '[data-test="Accordion-allcollapsable"] [data-test="Accordion-Header-2"]',
    )
      .click()
      .click();

    cy.get(
      '[data-test="Accordion-allcollapsable"] [data-test="Accordion-Header-1"] [aria-expanded="false"]',
    );
    cy.get(
      '[data-test="Accordion-allcollapsable"] [data-test="Accordion-Header-2"] [aria-expanded="false"]',
    );
  });
});
