import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserHeaderEdit from "./UserHeaderEdit";
import { useAppSelector } from "../../../../utils/hooks/selectors";
import { useUpdateProfile } from "../../../../utils/hooks/api/user";

jest.mock("../../../../utils/hooks/selectors", () => ({
  useAppSelector: jest.fn(),
}));

jest.mock("../../../../utils/hooks/api/user", () => ({
  useUpdateProfile: jest.fn(),
}));

describe("UserHeaderEdit Component", () => {
  let handleUpdateProfileMock: jest.Mock;
  let setOnEditMock: jest.Mock;

  beforeEach(() => {
    handleUpdateProfileMock = jest.fn();
    setOnEditMock = jest.fn();

    (useUpdateProfile as jest.Mock).mockReturnValue({
      handleUpdateProfile: handleUpdateProfileMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form with input fields and buttons", () => {
    // Simuler des informations utilisateur
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      firstName: "John",
      lastName: "Doe",
    });

    render(<UserHeaderEdit setOnEdit={setOnEditMock} />);

    // Vérifier que les champs de saisie et les boutons sont présents
    expect(screen.getByPlaceholderText("John")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Doe")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  test("submits the form with updated values", async () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      firstName: "John",
      lastName: "Doe",
    });

    render(<UserHeaderEdit setOnEdit={setOnEditMock} />);

    // Saisir de nouvelles valeurs
    fireEvent.change(screen.getByPlaceholderText("John"), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByPlaceholderText("Doe"), {
      target: { value: "Smith" },
    });

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    // Vérifier que handleUpdateProfile est appelé avec les nouvelles valeurs
    await waitFor(() => {
      expect(handleUpdateProfileMock).toHaveBeenCalledWith({
        firstName: "Jane",
        lastName: "Smith",
      });
    });
  });

  test("sets loading state when submitting", async () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      firstName: "John",
      lastName: "Doe",
    });

    render(<UserHeaderEdit setOnEdit={setOnEditMock} />);

    fireEvent.change(screen.getByPlaceholderText("John"), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByPlaceholderText("Doe"), {
      target: { value: "Smith" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    // Attendre que le bouton "Save" soit désactivé et en état de chargement
    const saveButton = screen.getByRole("button", { name: /Save/i });
    expect(saveButton).toBeDisabled();

    // Attendre que le bouton ait la classe "button--loading"
    await waitFor(() => {
      expect(saveButton).toHaveClass("button--loading");
    });
  });

  test("calls setOnEdit with false when cancel button is clicked", () => {
    render(<UserHeaderEdit setOnEdit={setOnEditMock} />);

    // Simuler le clic sur le bouton "Cancel"
    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));

    // Vérifier que setOnEdit est appelé avec false
    expect(setOnEditMock).toHaveBeenCalledWith(false);
  });

  test("does not submit if the values haven't changed", async () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      firstName: "John",
      lastName: "Doe",
    });

    render(<UserHeaderEdit setOnEdit={setOnEditMock} />);

    // Soumettre le formulaire sans changer les valeurs
    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    // Vérifier que handleUpdateProfile n'est pas appelé
    await waitFor(() => {
      expect(handleUpdateProfileMock).not.toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(setOnEditMock).toHaveBeenCalledWith(false);
    });
  });

  test("handles profile update errors", async () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      firstName: "John",
      lastName: "Doe",
    });

    // Simuler une erreur lors de la mise à jour du profil
    handleUpdateProfileMock.mockResolvedValueOnce(undefined);

    render(<UserHeaderEdit setOnEdit={setOnEditMock} />);

    // Saisir de nouvelles valeurs
    fireEvent.change(screen.getByPlaceholderText("John"), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByPlaceholderText("Doe"), {
      target: { value: "Smith" },
    });

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    // Vérifier que setOnEdit n'est pas appelé si l'update échoue
    await waitFor(() => {
      expect(setOnEditMock).not.toHaveBeenCalled();
    });
  });
});
