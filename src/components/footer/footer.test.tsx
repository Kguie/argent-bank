import { screen } from "@testing-library/react";

import { render } from "../../utils/test";
import Footer from "./Footer";

describe("Footer Component", () => {
  test("renders the footer with correct text", () => {
    render(<Footer />);

    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();

    const footerText = screen.getByText("Copyright 2020 Argent Bank");
    expect(footerText).toBeInTheDocument();
    expect(footerText).toHaveClass("footer__text");
  });
});
