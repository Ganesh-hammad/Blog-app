
// Unit tests for: signup


import bcryptjs from 'bcryptjs';
import User from "../../models/user.model.js";
import { errorHandler } from "../../utils/error.js";
import { signup } from '../auth.controllers';


jest.mock("../../models/user.model.js");
jest.mock("bcryptjs");
jest.mock("../../utils/error.js");

describe('signup() signup method', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            }
        };
        res = {
            json: jest.fn()
        };
        next = jest.fn();
    });

    describe('Happy paths', () => {
        it('should successfully sign up a user with valid input', async () => {
            // Arrange
            bcryptjs.hashSync.mockReturnValue('hashedPassword');
            User.prototype.save = jest.fn().mockResolvedValue();

            // Act
            await signup(req, res, next);

            // Assert
            expect(bcryptjs.hashSync).toHaveBeenCalledWith('password123', 10);
            expect(User.prototype.save).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith('signup successful');
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe('Edge cases', () => {
        it('should call next with an error if username is missing', async () => {
            // Arrange
            req.body.username = '';

            // Act
            await signup(req, res, next);

            // Assert
            expect(next).toHaveBeenCalledWith(errorHandler(400, 'All fields are required'));
            expect(res.json).not.toHaveBeenCalled();
        });

        it('should call next with an error if email is missing', async () => {
            // Arrange
            req.body.email = '';

            // Act
            await signup(req, res, next);

            // Assert
            expect(next).toHaveBeenCalledWith(errorHandler(400, 'All fields are required'));
            expect(res.json).not.toHaveBeenCalled();
        });

        it('should call next with an error if password is missing', async () => {
            // Arrange
            req.body.password = '';

            // Act
            await signup(req, res, next);

            // Assert
            expect(next).toHaveBeenCalledWith(errorHandler(400, 'All fields are required'));
            expect(res.json).not.toHaveBeenCalled();
        });

        it('should call next with an error if User.save throws an error', async () => {
            // Arrange
            const error = new Error('Database error');
            User.prototype.save = jest.fn().mockRejectedValue(error);

            // Act
            await signup(req, res, next);

            // Assert
            expect(next).toHaveBeenCalledWith(error);
            expect(res.json).not.toHaveBeenCalled();
        });
    });
});

// End of unit tests for: signup
