import { render } from "@testing-library/react";
import AppBar, { Props } from "./AppBar";

describe("<AppBar />", () => {
  const setup = (props: Props) => {
    const element = render(<AppBar {...props} />);
    const root = element.getByTestId("app-bar");
    const header = element.getByTestId("app-bar-header");
    return { root, header };
  };

  it("should render", () => {
    const { root } = setup({
      header: "<header>",
    });

    expect(root).toBeInTheDocument();
  });

  it("should render the header", () => {
    const headerText = "<header>";
    const { header } = setup({
      header: headerText,
    });

    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe(headerText);
  });
});
