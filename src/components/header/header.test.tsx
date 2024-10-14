import { screen, fireEvent, within } from "@testing-library/react";
import { useNavigate } from "react-router-dom";

import { render } from "../../utils/test";
import HeaderRightNav from "./HeaderRightNav";

// Mock pour le hook useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("HeaderRightNav Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    mockNavigate.mockClear();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  test("renders Sign In link when pathname is not /user", () => {
    render(<HeaderRightNav />, ["/"]);

    const headerRightButtons = screen.getAllByTestId("header-right-nav-item");

    expect(headerRightButtons.length).toEqual(1);
    expect(
      within(headerRightButtons[0]).getByText("Sign In")
    ).toBeInTheDocument();
    expect(
      within(headerRightButtons[0]).getByTestId("header-right-nav-item__icon")
    ).toBeInTheDocument();
    expect(
      within(headerRightButtons[0]).getByTestId("header-right-nav-item__icon")
    ).toHaveClass("fa-user-circle");

    fireEvent.click(screen.getByText("Sign In"));
    expect(mockNavigate).toHaveBeenCalledWith("/sign-in");
  });

  test("renders user-specific navigation when pathname includes /user", () => {
    render(<HeaderRightNav />, ["/user"]);

    const headerRightButtons = screen.getAllByTestId("header-right-nav-item");

    expect(headerRightButtons.length).toEqual(2);

    expect(within(headerRightButtons[0]).getByText("Tony")).toBeInTheDocument();
    expect(
      within(headerRightButtons[0]).getByTestId("header-right-nav-item__icon")
    ).toBeInTheDocument();
    expect(
      within(headerRightButtons[0]).getByTestId("header-right-nav-item__icon")
    ).toHaveClass("fa-user-circle");

    expect(
      within(headerRightButtons[1]).getByText("Sign Out")
    ).toBeInTheDocument();
    expect(
      within(headerRightButtons[1]).getByTestId("header-right-nav-item__icon")
    ).toBeInTheDocument();
    expect(
      within(headerRightButtons[1]).getByTestId("header-right-nav-item__icon")
    ).toHaveClass("fa-sign-out");

    fireEvent.click(screen.getByText("Tony"));
    expect(mockNavigate).toHaveBeenCalledWith("/user");

    fireEvent.click(screen.getByText("Sign Out"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
