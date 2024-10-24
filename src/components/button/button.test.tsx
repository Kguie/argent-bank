import { screen, fireEvent } from "@testing-library/react";

import { render } from "../../utils/test/index";
import Button from "./Button";

describe("Button Component", () => {
  test("renders the button with the correct label", () => {
    render(<Button label="Click me" />);

    // Vérifie que le label est rendu correctement
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("renders the loading spinner when isLoading is true", () => {
    render(<Button label="Submit" isLoading={true} />);

    // Vérifie que le loader est affiché
    const loaderElement = screen.getByTestId("button-spinner");
    expect(loaderElement).toBeInTheDocument();

    // Vérifie que la classe `button--loading` est ajoutée
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("button--loading");
  });

  test("button is disabled when isLoading is true", () => {
    render(<Button label="Submit" isLoading={true} />);

    // Vérifie que le bouton est désactivé
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDisabled();
  });

  test("button is enabled when isLoading is false", () => {
    render(<Button label="Submit" isLoading={false} />);

    // Vérifie que le bouton est activé
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeEnabled();
  });

  test("triggers onClick event when button is clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);

    // Simule le clic sur le bouton
    const buttonElement = screen.getByText(/Click me/i);
    fireEvent.click(buttonElement);

    // Vérifie que la fonction `handleClick` est appelée
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
