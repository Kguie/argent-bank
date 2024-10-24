import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";

import SignInForm from "./SignInForm";
import { useLogIn } from "../../utils/hooks/api/user";
import { useAppSelector } from "../../utils/hooks/selectors";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../utils/hooks/api/user", () => ({
  useLogIn: jest.fn(),
}));

jest.mock("../../utils/hooks/selectors", () => ({
  useAppSelector: jest.fn(),
  selectUserInfos: jest.fn(),
}));

describe("SignInForm Component", () => {
  let navigateMock: jest.Mock;
  let handleLogInMock: jest.Mock;

  beforeEach(() => {
    navigateMock = jest.fn();
    handleLogInMock = jest.fn();

    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (useLogIn as jest.Mock).mockReturnValue({
      handleLogIn: handleLogInMock,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form with username, password fields, and sign-in button", () => {
    render(<SignInForm />);

    // Vérification des champs de formulaire
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign in/i })
    ).toBeInTheDocument();
  });

  test("submits the form and calls handleLogIn with the correct data", async () => {
    render(<SignInForm />);

    // Saisir les données utilisateur
    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByLabelText(/Remember me/i));

    // Simuler la soumission du formulaire
    fireEvent.click(screen.getByRole("button", { name: /Sign in/i }));

    // Vérifier que `handleLogIn` est appelé avec les bonnes données
    await waitFor(() => {
      expect(handleLogInMock).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
        rememberMe: true,
      });
    });
  });

  test("displays loading state when form is submitted", async () => {
    render(<SignInForm />);

    // Simuler la soumission du formulaire
    fireEvent.submit(screen.getByTestId("sign-in-form"));

    // Vérifier que le bouton est désactivé et en état de chargement
    const buttonElement = screen.getByRole("button", { name: /Sign in/i });
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass("button--loading");
  });

  test("displays an error message when login fails", async () => {
    (useLogIn as jest.Mock).mockReturnValue({
      handleLogIn: handleLogInMock,
      error: "Connection attempt failed",
    });

    render(<SignInForm />);

    // Simuler la soumission du formulaire avec une erreur
    fireEvent.submit(screen.getByTestId("sign-in-form"));

    // Vérifier que le message d'erreur est affiché
    const errorMessage = await screen.findByText(/Connection attempt failed/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("redirects to profile page after successful login", async () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      id: "123",
      firstName: "John",
    });

    render(<SignInForm />);

    // Simuler la soumission du formulaire et la connexion réussie
    fireEvent.submit(screen.getByTestId("sign-in-form"));

    // Vérifier que la navigation vers la page de profil a bien eu lieu
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/profile/123");
    });
  });
});
