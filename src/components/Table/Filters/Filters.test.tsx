import { act, fireEvent, render } from "@testing-library/react";
import Filters, { Props } from "./Filters";

describe("<Filters />", () => {
  const setup = (props: Props) => {
    const element = render(<Filters {...props} />);
    const root = element.getByTestId("filters");
    const input = element.getByTestId("filters-input");
    return { root, input };
  };

  it("should render", () => {
    const { root } = setup({
      show: true,
      onSearchChange: () => {},
    });

    expect(root).toBeInTheDocument();
  });

  it("should render the text input", () => {
    const { input } = setup({
      show: true,
      onSearchChange: () => {},
    });

    expect(input).toBeInTheDocument();
  });

  it("should call onSearchChange when the text input is used", () => {
    const onSearchChangeMock = jest.fn();
    const text = "<text>";
    const { input } = setup({
      show: true,
      onSearchChange: onSearchChangeMock,
    });

    expect(input).toBeInTheDocument();
    act(() => {
      fireEvent.change(input, { target: { value: text } });
    });

    expect(onSearchChangeMock).toHaveBeenCalledTimes(1);
    expect(onSearchChangeMock).toHaveBeenCalledWith(text);
  });
});
