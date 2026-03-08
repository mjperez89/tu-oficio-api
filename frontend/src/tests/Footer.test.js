import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer/Footer';
test('renders Footer', () => {
    render(<Footer />);
    const linkElement = screen.getByRole('link', { name: /Categorias/i });
    expect(linkElement).toBeInTheDocument();
  });
  