import * as React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { HeaderComponent } from "../components/header-component";

afterEach(() => {
  cleanup();
});

//we can further replicate it two time for the below 2 images
test("should render droppe logo correctly", () => {
  render(<HeaderComponent />);
  const element = screen.getByTestId("heading-logo");
  expect(element).toBeInTheDocument();
  expect(element).toHaveAttribute("alt", "logo.png");
  expect(element).toHaveAttribute("src", "droppe-logo.png");
});
