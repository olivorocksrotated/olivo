import React from 'react';

import Connection from './connection';

describe('user report', () => {
    describe('<Connection />', () => {
        const connection = { id: '1', name: 'name', image: 'image' };

        it('should render', () => {
            cy.mount(<Connection connection={connection} />);
        });

        it('should display the name of the report', () => {
            cy.mount(<Connection connection={connection} />);
            cy.get('[data-cy="report-name"]').should('contain', connection.name);
        });
    });
});
