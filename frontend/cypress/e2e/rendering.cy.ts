context('Interactions', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://127.0.0.1:5001/', { fixture: 'matrix.json' });
        cy.visit('/');
    });

    it('matrix displays all cells', () => {
        cy.get('[data-cy-mx-cell-index]').should('have.length', 80 * 80);
    });

    it('neighborhood list displays all neighborhoods', () => {
        cy.get('[data-cy-nh-cell-index]').should('have.length', 380);
    });
});
