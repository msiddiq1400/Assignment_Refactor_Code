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

test("simulate modal open & close", () => {
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

test("add product from modal", async () => {
  render(<ShopApp />);

  //open modal
  const proposalButton = screen.getByTestId("add-product-proposal");
  userEvent.click(proposalButton);

  const totalCount0 = screen.queryByTestId("total-products-count");
  console.log(totalCount0);

  //fill the modal with test input
  const title = screen.queryByTestId("product-title");
  userEvent.type(title, "My Product Title");
  const price = screen.queryByTestId("product-price");
  userEvent.type(price, "20");
  const description = screen.queryByTestId("product-description");
  userEvent.type(description, "this is the product description");

  //add product button
  const addProductBtn = screen.queryByTestId("add-product-button-text");
  userEvent.click(addProductBtn);

  //modal is closed as product is added
  const afterProductAdded = screen.queryByTestId("add-product-modal");
  expect(afterProductAdded).toBeNull();
});
