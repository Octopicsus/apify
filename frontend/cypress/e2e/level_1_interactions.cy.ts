context('Interactions - Level 1', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://127.0.0.1:5001/', { fixture: 'matrix.json' });
        cy.visit('/');
    });

    it('clicking on neighborhood button activates the same symbol in matrix', () => {
        const button = cy.get('[data-cy-nh-row-index="5"][data-cy-nh-cell-index="57"]');
        button.click();
        const cell = cy.get('[data-cy-mx-row-index="5"][data-cy-mx-cell-index="57"]');
        cell.invoke('attr', 'data-cy-is-active-symbol').should('eq', 'true');
    });

    it('clicking on neighborhood button activates the cells surrounding the symbol in matrix', () => {
        const button = cy.get('[data-cy-nh-row-index="5"][data-cy-nh-cell-index="57"]');
        button.click();
        const cells = [
            [4, 56],
            [4, 57],
            [4, 58],
            [5, 56],
            [5, 58],
            [6, 56],
            [6, 57],
            [6, 58],
        ];
        cells.forEach((cellCoordinates) => {
            const cell = cy.get(
                `[data-cy-mx-row-index="${cellCoordinates[0]}"][data-cy-mx-cell-index="${cellCoordinates[1]}"]`,
            );
            cell.invoke('attr', 'data-cy-is-in-active-neighborhood').should('eq', 'true');
        });
    });
});
