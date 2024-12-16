import { act, render } from "@testing-library/react";
import TableHead, { Props } from "./TableHead";
import { Header } from "../Table";
import { SUPPORTED_SORT_FIELDS } from "../../../models/parameters";
import { Resource } from "../../../models/Resource";
import { Person } from "../../../models/Person";

describe("<TableHead />", () => {
  const setup = (props: Props<Person>) => {
    const element = render(<TableHead {...props} />);
    const root = element.getByTestId("table-head");
    const cells = element.queryAllByTestId("table-head-cell");
    const labels = element.queryAllByTestId("table-head-label");
    const headers = element.queryAllByTestId("table-head-header");
    return { root, cells, labels, headers };
  };

  it("should render", () => {
    const { root } = setup({
      headers: [],
      onRequestSort: () => {},
    });

    expect(root).toBeInTheDocument();
  });

  it("should render all the cells", () => {
    const headers: Header<Person>[] = [
      {
        field: "name",
        label: "<label-1>",
        format: "string",
      },
      {
        field: "name",
        label: "<label-2>",
        format: "string",
      },
    ];
    const { cells } = setup({
      headers,
      onRequestSort: () => {},
    });

    expect(cells).toHaveLength(headers.length);
    cells.forEach((cell) => {
      expect(cell).toBeInTheDocument();
    });
  });

  it("should render the header labels with the right content", () => {
    const headerLabels = ["<label-1>", "<label-2>", "<label-3>"];
    const headers: Header<Person>[] = headerLabels.map((label) => ({
      field: "name",
      label,
      format: "string",
    }));
    const { labels } = setup({
      headers,
      onRequestSort: () => {},
    });

    expect(labels).toHaveLength(headers.length);
    expect(labels).toHaveLength(headerLabels.length);
    labels.forEach((label, index) => {
      expect(label).toBeInTheDocument();
      expect(label.textContent).toEqual(headerLabels[index]);
    });
  });

  it("should call onRequestSort when clicking a column that supports sorting", () => {
    const onRequestSortMock = jest.fn();
    const field = SUPPORTED_SORT_FIELDS[0] as keyof Resource;
    const componentHeaders: Header<Person>[] = [
      {
        field,
        label: "<label-1>",
        format: "string",
      },
    ];
    const { headers } = setup({
      headers: componentHeaders,
      onRequestSort: onRequestSortMock,
    });

    expect(headers).toHaveLength(componentHeaders.length);
    headers.forEach((header) => {
      expect(header).toBeInTheDocument();
      act(() => {
        header.click();
      });
      expect(onRequestSortMock).toHaveBeenCalledWith(field);
    });
    expect(onRequestSortMock).toHaveBeenCalledTimes(headers.length);
  });

  it("should not call onRequestSort when clicking a column that doesn't supports sorting", () => {
    const onRequestSortMock = jest.fn();
    const field = "edited";
    const componentHeaders: Header<Person>[] = [
      {
        field,
        label: "<label-1>",
        format: "string",
      },
    ];
    const { headers } = setup({
      headers: componentHeaders,
      onRequestSort: onRequestSortMock,
    });

    headers.forEach((header) => {
      expect(header).toBeInTheDocument();
      act(() => {
        header.click();
      });
    });
    expect(onRequestSortMock).not.toHaveBeenCalled();
  });
});
