import React from 'react';

import ConnectionCard from './connection-card';

describe('connection', () => {
    describe('<ConnectionCard />', () => {
        const connection = { id: '1', user: { name: 'name', image: 'image', id: '2' } };

        it('should render', () => {
            cy.mount(<ConnectionCard connection={connection} />);
        });

        it('should display the name of the user', () => {
            cy.mount(<ConnectionCard connection={connection} />);
            cy.get('[data-cy="connection-user-name"]').should('contain', connection.user.name);
        });
    });
});
