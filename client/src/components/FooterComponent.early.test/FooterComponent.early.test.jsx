
// Unit tests for: FooterComponent

import React from 'react'
import FooterComponent from '../FooterComponent';


import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';


describe('FooterComponent() FooterComponent method', () => {
  // Happy Path Tests
  describe('Happy Paths', () => {
    test('should render the main blog link with correct text and href', () => {
      render(
        <Router>
          <FooterComponent />
        </Router>
      );
      const blogLink = screen.getByText("Ganesh's Blog");
      expect(blogLink).toBeInTheDocument();
      expect(blogLink.closest('a')).toHaveAttribute('href', '/');
    });

    test('should render all footer sections with correct titles', () => {
      render(
        <Router>
          <FooterComponent />
        </Router>
      );
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Follow us')).toBeInTheDocument();
      expect(screen.getByText('Legal')).toBeInTheDocument();
    });

    test('should render all footer links with correct hrefs', () => {
      render(
        <Router>
          <FooterComponent />
        </Router>
      );
      expect(screen.getByText('100 JS Projects').closest('a')).toHaveAttribute('href', 'https://www.100jsprojects.com');
      expect(screen.getByText("Sahand's Blog").closest('a')).toHaveAttribute('href', '/about');
      expect(screen.getByText('Github').closest('a')).toHaveAttribute('href', 'https://www.github.com/sahandghavidel');
      expect(screen.getByText('Discord').closest('a')).toHaveAttribute('href', '#');
      expect(screen.getByText('Privacy Policy').closest('a')).toHaveAttribute('href', '#');
      expect(screen.getByText('Terms & Conditions').closest('a')).toHaveAttribute('href', '#');
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    test('should handle missing href attributes gracefully', () => {
      render(
        <Router>
          <FooterComponent />
        </Router>
      );
      const discordLink = screen.getByText('Discord');
      expect(discordLink.closest('a')).toHaveAttribute('href', '#');
    });

    test('should render without crashing when no props are provided', () => {
      render(
        <Router>
          <FooterComponent />
        </Router>
      );
      expect(screen.getByText('About')).toBeInTheDocument();
    });
  });
});

// End of unit tests for: FooterComponent
