context('Interactions - Level 2', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://127.0.0.1:5001/', { fixture: 'matrix.json' });
        cy.visit('/');
    });

    it('cells in active neighborhood are surrounded by a border', () => {
        const button = cy.get('[data-cy-nh-row-index="5"][data-cy-nh-cell-index="57"]');
        button.click();
        const cells = [
            { row: 4, cell: 56, bt: true, bl: true, bb: false, br: false },
            { row: 4, cell: 57, bt: true, bl: false, bb: false, br: false },
            { row: 4, cell: 58, bt: true, bl: false, bb: false, br: true },
            { row: 5, cell: 56, bt: false, bl: true, bb: false, br: false },
            { row: 5, cell: 58, bt: false, bl: false, bb: false, br: true },
            { row: 6, cell: 56, bt: false, bl: true, bb: true, br: false },
            { row: 6, cell: 57, bt: false, bl: false, bb: true, br: false },
            { row: 6, cell: 58, bt: false, bl: false, bb: true, br: true },
        ];
        cells.forEach((cellInfo) => {
            const cell = cy.get(`[data-cy-mx-row-index="${cellInfo.row}"][data-cy-mx-cell-index="${cellInfo.cell}"]`);
            // Warning: This test was written with assumption that all cells have white border by default and only the color changes
            // if the neighborhood is active. If you decide to implement it differently, you will have to fix this test.
            if (cellInfo.bt) {
                cell.should('not.have.css', 'border-top-color', 'rgb(255, 255, 255)');
            } else {
                cell.should('have.css', 'border-top-color', 'rgb(255, 255, 255)');
            }
            if (cellInfo.bl) {
                cell.should('not.have.css', 'border-left-color', 'rgb(255, 255, 255)');
            } else {
                cell.should('have.css', 'border-left-color', 'rgb(255, 255, 255)');
            }
            if (cellInfo.bb) {
                cell.should('not.have.css', 'border-bottom-color', 'rgb(255, 255, 255)');
            } else {
                cell.should('have.css', 'border-bottom-color', 'rgb(255, 255, 255)');
            }
            if (cellInfo.br) {
                cell.should('not.have.css', 'border-right-color', 'rgb(255, 255, 255)');
            } else {
                cell.should('have.css', 'border-right-color', 'rgb(255, 255, 255)');
            }
        });
    });

    // TODO [LVL2]: Implement a test which tests whether highlighting of the selected type works properly
});
