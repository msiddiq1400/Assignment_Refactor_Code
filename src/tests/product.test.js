import * as React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { ShopApp } from "../shop-app";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  cleanup();
});

test("do add product button exists", () => {
  render(<ShopApp />);
  const element = screen.getByTestId("add-product-proposal");
  expect(element).toBeInTheDocument();
  expect(element).toHaveTextContent("Send product proposal");
});

test("on button click modal should open", () => {
  render(<ShopApp />);
  const proposalButton = screen.getByTestId("add-product-proposal");

  //before button is clicked, modal is not visible
  let beforeClickedSendProposal = screen.queryByTestId(
    "add-product-button-text"
  );
  expect(beforeClickedSendProposal).toBeNull();

  //button is clicked now
  userEvent.click(proposalButton);

  //now modal is visible
  const afterClickSendProposal = screen.queryByTestId(
    "add-product-button-text"
  );
  expect(afterClickSendProposal).toHaveTextContent("Add a product");

  //on modal close the text should disappear
  const modalCloseButton = screen.queryByTestId("modal-close-button");

  //modal close is clicked is clicked now
  userEvent.click(modalCloseButton);

  //modal is closed now, this text should not exist on the screen
  beforeClickedSendProposal = screen.queryByTestId("add-product-button-text");
  expect(beforeClickedSendProposal).toBeNull();
});
