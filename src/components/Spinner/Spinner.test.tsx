import { render } from "@testing-library/react";
import Spinner from "./Spinner";

describe("<Spinner />", () => {
  const setup = () => {
    const element = render(<Spinner />);
    const spinner = element.queryByTestId("spinner");
    return { spinner };
  };

  it("should render", () => {
    const { spinner } = setup();

    expect(spinner).toBeInTheDocument();
  });
});
