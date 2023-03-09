import React from 'react';

import Report from './report';

describe('<Report /> - user report component', () => {
    const report = { id: '1', name: 'name' };

    it('should render', () => {
        cy.mount(<Report report={report} />);
    });

    it('should display the name of the report', () => {
        cy.mount(<Report report={report} />);
        cy.get('[data-cy="report-name"]').should('contain', report.name);
    });
});