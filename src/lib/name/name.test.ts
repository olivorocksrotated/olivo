import { describe, expect, it } from 'vitest';

import { getFirstName, getNameAcronym } from './name';

describe('lib name', () => {
    describe('name', () => {
        describe('getNameAcronym', () => {
            it('should return an empty string if the passed name is undefined', () => {
                expect(getNameAcronym(undefined)).toBe('');
            });

            it('should return an empty string if the passed name is null', () => {
                expect(getNameAcronym(null)).toBe('');
            });

            it('should return an empty string if the passed name is empty string', () => {
                expect(getNameAcronym('')).toBe('');
            });

            it('should return the first letter of each part of the full name, AKA the acronym', () => {
                const expectedAcronym = 'LV';
                expect(getNameAcronym('Leandro Vilas')).toBe(expectedAcronym);
            });

            it('should return only one letter if the full name has only one word', () => {
                const expectedAcronym = 'L';
                expect(getNameAcronym('Leandro')).toBe(expectedAcronym);
            });

            it('should return only two letters if the full name has more than two words', () => {
                const expectedAcronym = 'LN';
                expect(getNameAcronym('Leandro Nicolas Vilas')).toBe(expectedAcronym);
            });
        });

        describe('getFirstName', () => {
            it('should return an empty string if the passed name is undefined', () => {
                expect(getFirstName(undefined)).toBe('');
            });

            it('should return an empty string if the passed name is null', () => {
                expect(getFirstName(null)).toBe('');
            });

            it('should return an empty string if the passed name is empty string', () => {
                expect(getFirstName('')).toBe('');
            });

            it('should return the first word of the full name', () => {
                const expectedFirstName = 'Leandro';
                expect(getFirstName('Leandro Nicolas Vilas')).toBe(expectedFirstName);
            });

            it('should return the only word if the full name has only one word', () => {
                const expectedFirstName = 'Leandro';
                expect(getFirstName('Leandro')).toBe(expectedFirstName);
            });
        });
    });
});
