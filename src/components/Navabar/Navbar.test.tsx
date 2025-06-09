import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, test, expect, vi } from 'vitest';
import { Navbar } from './Navabar';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const router = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...router,
    useNavigate: () => mockNavigate,
  };
});

describe('Navbar', () => {
  test('renders logo and navigation links', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    );

    expect(await screen.findByText('🎬 MovieApp')).toBeInTheDocument();
    expect(await screen.findByText('Home')).toBeInTheDocument();
    expect(await screen.findByText('Favorites')).toBeInTheDocument();
  });

  test('submits search and navigates',  () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: 'batman' },
    });

    fireEvent.submit(screen.getByRole('textbox').closest('form')!);
    expect(mockNavigate).toHaveBeenCalledWith('/?query=batman');
  });
});
