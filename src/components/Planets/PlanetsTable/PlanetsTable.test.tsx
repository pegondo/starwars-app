import { render } from "@testing-library/react";
import { ErrorResponse } from "../../../api/error";

// Mock the Table component
import "../../Table/Table";
jest.mock("../../Table/Table");

// Mock the planets endpoint so the test doesn't access import.meta.env
import "../../../api/endpoints";
jest.mock("../../../api/endpoints", () => ({
  PLANETS_ENDPOINT: "<planets-endpoint>",
}));

// Mock useService
import useService from "../../../api/useService/useService";
import PlanetsTable from "./PlanetsTable";
jest.mock("../../../api/useService/useService");
const useServiceMock = useService as jest.Mock;

describe("<PlanetsTable />", () => {
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
    const element = render(<PlanetsTable />);
    const spinner = element.queryByTestId("planets-table-spinner");
    const errorDialog = element.queryByTestId("planets-table-error-dialog");
    const table = element.queryByTestId("planets-table-table");
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
