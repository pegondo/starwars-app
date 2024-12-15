import { act, render } from "@testing-library/react";
import ErrorDialog, { Props } from "./ErrorDialog";

describe("<ErrorDialog />", () => {
  const setup = (props: Props) => {
    const element = render(<ErrorDialog {...props} />);
    const root = element.queryByTestId("error-dialog");
    const title = element.queryByTestId("error-dialog-title");
    const message = element.queryByTestId("error-dialog-message");
    const button = element.queryByTestId("error-dialog-button");
    return { root, title, message, button };
  };

  it("should render", () => {
    const { root } = setup({
      title: "<title>",
      message: "<message>",
      onClose: () => {},
    });

    expect(root).toBeInTheDocument();
  });

  it("should return not render if the title is empty", () => {
    const { root } = setup({
      title: "",
      message: "<message>",
      onClose: () => {},
    });

    expect(root).toBeNull();
  });

  it("should render the title", () => {
    const expectedTitle = "<title>";
    const { title } = setup({
      title: expectedTitle,
      message: "<message>",
      onClose: () => {},
    });

    expect(title).toBeInTheDocument();
    expect(title?.textContent).toEqual(expectedTitle);
  });

  it("should render the message", () => {
    const expectedMessage = "<message>";
    const { message } = setup({
      title: "<title>",
      message: expectedMessage,
      onClose: () => {},
    });

    expect(message).toBeInTheDocument();
    expect(message?.textContent).toEqual(expectedMessage);
  });

  it("should render the button with the given button text", () => {
    const expectedButtonText = "<button-text>";
    const { button } = setup({
      title: "<title>",
      message: "<message>",
      buttonText: expectedButtonText,
      onClose: () => {},
    });

    expect(button).toBeInTheDocument();
    expect(button?.textContent).toEqual(expectedButtonText);
  });

  it("should render the button with a text of 'OK' if no button text is provided", () => {
    const expectedButtonText = "OK";
    const { button } = setup({
      title: "<title>",
      message: "<message>",
      onClose: () => {},
    });

    expect(button).toBeInTheDocument();
    expect(button?.textContent).toEqual(expectedButtonText);
  });

  it("should call the onClose function when the close button is pressed", () => {
    const onCloseMock = jest.fn();
    const { button } = setup({
      title: "<title>",
      message: "<message>",
      onClose: onCloseMock,
    });

    expect(button).toBeInTheDocument();
    act(() => {
      button?.click();
    });

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
