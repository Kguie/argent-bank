import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { useNavigate } from "react-router-dom";

import HeaderRightNav from "./HeaderRightNav";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/selectors";
import { logOut } from "../../features/authToken";
import { resetUserInfos } from "../../features/userInfos";
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../utils/hooks/selectors", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("../../features/authToken", () => ({
  logOut: jest.fn(),
}));

jest.mock("../../features/userInfos", () => ({
  resetUserInfos: jest.fn(),
}));

const mockStore = configureStore([]);

describe("HeaderRightNav Component", () => {
  let store: any;
  let navigateMock: jest.Mock;
  let dispatchMock: jest.Mock;

  beforeEach(() => {
    store = mockStore({});
    navigateMock = jest.fn();
    dispatchMock = jest.fn();

    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders Sign In when userInfos is null", () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue(null);

    render(
      <Provider store={store}>
        <HeaderRightNav />
      </Provider>
    );

    const signInButton = screen.getByText(/Sign In/i);
    expect(signInButton).toBeInTheDocument();

    fireEvent.click(signInButton);
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  test("renders user firstName and Sign Out when userInfos is available", () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      id: "123",
      firstName: "John",
      lastName: "Doe",
    });

    render(
      <Provider store={store}>
        <HeaderRightNav />
      </Provider>
    );

    // Vérifier que le prénom de l'utilisateur est affiché
    const userFirstNameButton = screen.getByText("John");
    expect(userFirstNameButton).toBeInTheDocument();

    // Vérifier que le bouton Sign Out est affiché
    const signOutButton = screen.getByText(/Sign Out/i);
    expect(signOutButton).toBeInTheDocument();

    // Vérifier la redirection vers le profil lors du clic sur le prénom
    fireEvent.click(userFirstNameButton);
    expect(navigateMock).toHaveBeenCalledWith("/profile/123");

    // Vérifier le dispatch des actions lors du clic sur Sign Out
    fireEvent.click(signOutButton);
    expect(dispatchMock).toHaveBeenCalledWith(logOut());
    expect(dispatchMock).toHaveBeenCalledWith(resetUserInfos());
    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
