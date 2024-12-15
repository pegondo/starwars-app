import { render } from "@testing-library/react";
import TableToolbar, { Props } from "./TableToolbar";
import { act } from "react";

describe("<TableToolbar />", () => {
  const setup = (props: Props) => {
    const element = render(<TableToolbar {...props} />);
    const root = element.getByTestId("table-toolbar");
    const title = element.getByTestId("table-toolbar-title");
    const tooltip = element.getByTestId("table-toolbar-tooltip");
    return { root, title, tooltip };
  };

  it("should render", () => {
    const { root } = setup({
      title: "<title>",
      onShowFilters: () => {},
    });

    expect(root).toBeInTheDocument();
  });

  it("should render the title", () => {
    const expectedTitle = "<title>";
    const { title } = setup({
      title: expectedTitle,
      onShowFilters: () => {},
    });

    expect(title).toBeInTheDocument();
    expect(title.textContent).toEqual(expectedTitle);
  });

  it("should call onShowFilters when clicking the tooltip", () => {
    const onShowFiltersMock = jest.fn();
    const { tooltip } = setup({
      title: "<title>",
      onShowFilters: onShowFiltersMock,
    });

    expect(tooltip).toBeInTheDocument();
    act(() => {
      tooltip.click();
    });
    expect(onShowFiltersMock).toHaveBeenCalledTimes(1);
  });
});
