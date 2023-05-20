import React from 'react';

import Connection from './connection-card';

describe('connection', () => {
    describe('<ConnectionCard />', () => {
        const connection = { id: '1', name: 'name', image: 'image' };

        it('should render', () => {
            cy.mount(<Connection connection={connection} />);
        });

        it('should display the name of the user', () => {
            cy.mount(<Connection connection={connection} />);
            cy.get('[data-cy="connection-user-name"]').should('contain', connection.name);
        });
    });
});
