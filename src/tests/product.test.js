import * as React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { ShopApp } from "../shop-app";

afterEach(() => {
  cleanup();
});

test("do add product button exists", () => {
  render(<ShopApp />);
  const element = screen.getByTestId("add-product-button");
  expect(element).toBeInTheDocument();
  expect(element).toHaveTextContent("Send product proposal");
});
