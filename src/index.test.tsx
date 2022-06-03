import "@testing-library/jest-dom";
import React, { memo } from "react";
import { render, screen } from "@testing-library/react";
import { useObject } from "./index";

let childNo: number;
let parentNo: number;
type ChildProps = {
  obj: Record<string, unknown>;
};

const Child = memo<ChildProps>(({ obj }) => (
  <div>
    <p>Child render no.: {++childNo}</p>
    <pre>{JSON.stringify(obj)}</pre>
  </div>
));

const BasicExample = () => {
  const obj = {
    u: undefined,
    n: null,
    bool: false,
    number: 123,
    string: "baz",
  };
  return (
    <div>
      <p>Parent render no.: {++parentNo}</p>
      <Child obj={obj} />
    </div>
  );
};

const CacheExample = () => {
  const obj = useObject({
    u: undefined,
    n: null,
    bool: false,
    number: 123,
    string: "baz",
  });
  return (
    <div>
      <p>Parent render no.: {++parentNo}</p>
      <Child obj={obj} />
    </div>
  );
};

const ValueOfExample = () => {
  const obj = useObject({
    u: undefined,
    n: null,
    bool: false,
    number: 123,
    string: "baz",
    date: new Date(2000, 0, 1),
  });
  return (
    <div>
      <p>Parent render no.: {++parentNo}</p>
      <Child obj={obj} />
    </div>
  );
};

const ValueChangeExample = () => {
  const obj = useObject({
    u: undefined,
    n: null,
    bool: parentNo < 50 ? false : true,
    number: 123,
    string: "baz",
    date: new Date(2000, 0, 1),
  });
  return (
    <div>
      <p>Parent render no.: {++parentNo}</p>
      <Child obj={obj} />
    </div>
  );
};

const ValueOfChangeExample = () => {
  const obj = useObject({
    u: undefined,
    n: null,
    bool: false,
    number: 123,
    string: "baz",
    date: new Date(2000, 0, parentNo < 50 ? 1 : 2),
  });
  return (
    <div>
      <p>Parent render no.: {++parentNo}</p>
      <Child obj={obj} />
    </div>
  );
};

beforeEach(() => {
  childNo = 0;
  parentNo = 0;
});

test.each([
  [BasicExample, 100],
  [CacheExample, 1],
  [ValueOfExample, 1],
  [ValueChangeExample, 2],
  [ValueOfChangeExample, 2],
])("%o should render %i times", (Component, count) => {
  const { rerender } = render(<Component />);
  expect(screen.queryByText("Parent render no.: 1")).toBeInTheDocument();
  expect(screen.queryByText("Child render no.: 1")).toBeInTheDocument();

  for (let i = 0; i < 99; i++) {
    rerender(<Component />);
  }

  expect(screen.queryByText("Parent render no.: 100")).toBeInTheDocument();
  expect(screen.queryByText(`Child render no.: ${count}`)).toBeInTheDocument();
});
