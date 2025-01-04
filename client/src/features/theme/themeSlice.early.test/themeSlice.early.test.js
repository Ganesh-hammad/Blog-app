
// Unit tests for: themeSlice


import { toggleTheme } from '../themeSlice';


describe('themeSlice() themeSlice method', () => {
    // Happy Path Tests
    describe('Happy Paths', () => {
        test('should initialize with the default theme as "light"', () => {
            // Arrange
            const initialState = undefined;

            // Act
            const state = themeReducer(initialState, { type: '@@INIT' });

            // Assert
            expect(state.theme).toBe('light');
        });

        test('should toggle theme from "light" to "dark"', () => {
            // Arrange
            const initialState = { theme: 'light' };

            // Act
            const state = themeReducer(initialState, toggleTheme());

            // Assert
            expect(state.theme).toBe('dark');
        });

        test('should toggle theme from "dark" to "light"', () => {
            // Arrange
            const initialState = { theme: 'dark' };

            // Act
            const state = themeReducer(initialState, toggleTheme());

            // Assert
            expect(state.theme).toBe('light');
        });
    });

    // Edge Case Tests
    describe('Edge Cases', () => {
        test('should handle an undefined initial state gracefully', () => {
            // Arrange
            const initialState = undefined;

            // Act
            const state = themeReducer(initialState, toggleTheme());

            // Assert
            expect(state.theme).toBe('dark');
        });

        test('should handle an unexpected theme value gracefully', () => {
            // Arrange
            const initialState = { theme: 'unexpected' };

            // Act
            const state = themeReducer(initialState, toggleTheme());

            // Assert
            expect(state.theme).toBe('light');
        });

        test('should not change state for unknown action types', () => {
            // Arrange
            const initialState = { theme: 'light' };

            // Act
            const state = themeReducer(initialState, { type: 'UNKNOWN_ACTION' });

            // Assert
            expect(state.theme).toBe('light');
        });
    });
});

// End of unit tests for: themeSlice
