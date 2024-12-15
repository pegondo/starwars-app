import { render } from "@testing-library/react";
import PeopleTable from "./PeopleTable";
import { ErrorResponse } from "../../../api/error";

// Mock the Table component
import "../../Table/Table";
jest.mock("../../Table/Table");

// Mock useService
import useService from "../../../api/useService/useService";
jest.mock("../../../api/useService/useService");
const useServiceMock = useService as jest.Mock;

describe("<PeopleTable />", () => {
  const mockServiceResponse = <T,>(
    successResponse:
      | {
          status: number;
          data: T;
        }
      | undefined,
    errorResponse:
      | {
          status: number;
          data: ErrorResponse;
        }
      | undefined,
    error?: Error
  ) => {
    useServiceMock.mockReturnValue({ successResponse, errorResponse, error });
  };

  const setup = () => {
    const element = render(<PeopleTable />);
    const spinner = element.queryByTestId("people-table-spinner");
    const errorDialog = element.queryByTestId("people-table-error-dialog");
    const table = element.queryByTestId("people-table-table");
    return { spinner, errorDialog, table };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the spinner when useService returns undefined", () => {
    mockServiceResponse(undefined, undefined, undefined);
    const { spinner } = setup();

    expect(spinner).toBeInTheDocument();
  });

  it("should render the error dialog when useService returns an error response", () => {
    mockServiceResponse(
      undefined,
      {
        data: {
          error_code: "<error-code>",
          error_message: "<error-message>",
        },
        status: 404,
      },
      undefined
    );
    const { errorDialog } = setup();

    expect(errorDialog).toBeInTheDocument();
  });

  it("should render the error dialog when useService returns an error", () => {
    mockServiceResponse(undefined, undefined, new Error("<error>"));
    const { errorDialog } = setup();

    expect(errorDialog).toBeInTheDocument();
  });

  it("should render the table when useService returns a success response", () => {
    mockServiceResponse(
      {
        status: 200,
        data: "<success-response>",
      },
      undefined,
      undefined
    );
    const { table } = setup();

    expect(table).toBeInTheDocument();
  });
});
