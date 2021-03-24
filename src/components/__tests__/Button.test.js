import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Button from "components/Button";

afterEach(cleanup);

it("renders its `children` prop as text", () => {
  const { getByText } = render(<Button>Default</Button>); // render function is imported from the react-testing-library. // getByText is a query funcion returned by render func - part of dom-testing-library
  expect(getByText("Default")).toBeInTheDocument(); // expect is injected into global scope by Jest. // toBeInTheDocument is matcher provided by jest-dom library
});

it("renders a default button style", () => {
  const { getByText } = render(<Button>Default</Button>);
  expect(getByText("Default")).toHaveClass("button");
});

it("renders a confirm button", () => {
  const { getByText } = render(<Button confirm>Confirm</Button>);
  expect(getByText("Confirm")).toHaveClass("button--confirm");
});

it("renders a danger button", () => {
  const { getByText } = render(<Button danger>Danger</Button>);
  expect(getByText("Danger")).toHaveClass("button--danger");
});

it("renders a clickable button", () => {
  const handleClick = jest.fn();
  const { getByText } = render(
    <Button onClick={handleClick}>Clickable</Button>
  );

  const button = getByText("Clickable");

  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

it("renders a disabled button", () => {
  const handleClick = jest.fn();
  const { getByText } = render(
    <Button disabled onClick={handleClick}>
      Disabled
    </Button>
  );

  const button = getByText("Disabled");

  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(0);
});
