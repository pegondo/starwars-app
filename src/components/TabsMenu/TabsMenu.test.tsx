import { render } from "@testing-library/react";
import TabsMenu, { Props } from "./TabsMenu";

describe("<TabsMenu />", () => {
  const setup = (props: Props) => {
    const element = render(<TabsMenu {...props} />);
    const root = element.getByTestId("tabs-menu");
    const labels = element.queryAllByTestId("tabs-menu-label");
    const contents = element.queryAllByTestId("tabs-menu-content");
    return { root, labels, contents };
  };

  it("should render", () => {
    const { root } = setup({
      elements: [],
    });

    expect(root).toBeInTheDocument();
  });

  it("should render all the element labels", () => {
    const expectedLabels = ["<label-1>", "<label-2>", "<label-3>"];
    const { labels } = setup({
      elements: expectedLabels.map((label) => ({
        label,
        content: <></>,
      })),
    });

    expect(labels).toHaveLength(expectedLabels.length);
    labels.forEach((label, index) => {
      expect(label).toBeInTheDocument();
      expect(label.textContent).toEqual(expectedLabels[index]);
    });
  });

  it("should render the first element content", () => {
    const expectedContentTexts = ["content-1", "content-2", "content-3"];
    const { contents } = setup({
      elements: expectedContentTexts.map((contentText) => ({
        label: "<label>",
        content: <div>{contentText}</div>,
      })),
    });

    expect(contents).toHaveLength(expectedContentTexts.length);
    contents.forEach((content, index) => {
      expect(content).toBeInTheDocument();
      if (index === 0) {
        expect(content.textContent).toBe(expectedContentTexts[index]);
      }
    });
  });
});
