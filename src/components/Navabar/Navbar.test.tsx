import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi } from "vitest";
import { Navbar } from "./Navabar";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const router = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...router,
    useNavigate: () => mockNavigate,
  };
});

describe("Navbar", () => {
  test("renders logo and navigation links", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
      </MemoryRouter>
    );

    expect(await screen.findByText("🎬 MovieApp")).toBeInTheDocument();
    expect(await screen.findByText("Home")).toBeInTheDocument();
    expect(await screen.findByText("Favorites")).toBeInTheDocument(); // Favourites literowka
  });

  test("submits search and navigates", () => {
    // czemu nie async? czy to jest asynchroniczne? opis aserscji powinien byc bardziej prezycyjny
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: "batman" },
    });

    // czemu fireEvent a nie np. userEvent.setup? jaka jest roznica?

    fireEvent.submit(screen.getByRole("textbox").closest("form")!); // ! - non-null assertion operator, to jest bezpieczne? powinno sie znajdowac cos takiego w tescie?
    expect(mockNavigate).toHaveBeenCalledWith("/?query=batman");
  });
});
