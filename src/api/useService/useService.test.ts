import { renderHook, waitFor } from "@testing-library/react";
import useService from "./useService";
import { Params } from "../../models/parameters";
import { ErrorResponse } from "../error";

// Mock axios
import axios from "axios";
jest.mock("axios");
const axiosMock = axios as jest.Mocked<typeof axios>;

describe("useService()", () => {
  const mockServiceResponse = <T>(
    response:
      | {
          status: number;
          data: T | ErrorResponse;
        }
      | undefined,
    error?: Error
  ) => {
    if (response) {
      axiosMock.get.mockResolvedValue({
        status: response.status,
        data: response.data,
        statusText: "<status-text>",
        config: {
          url: "<url>",
        },
        headers: {},
      });
      return;
    }
    if (error) {
      axiosMock.get.mockRejectedValue(error);
      return;
    }
  };

  const setup = (path: string, params?: Params) =>
    renderHook(() => useService(path, params));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return undefined when loading", () => {
    mockServiceResponse({
      status: 200,
      data: "valid response",
    });

    const { result } = setup("<endpoint>");

    expect(result.current.error).toBeUndefined();
    expect(result.current.successResponse).toBeUndefined();
    expect(result.current.errorResponse).toBeUndefined();
  });

  it("should return the response when axios processes the request successfully", async () => {
    const response = {
      status: 200,
      data: "valid response",
    };
    mockServiceResponse(response);

    const { result } = setup("<endpoint>");

    await waitFor(() => {
      expect(result.current.error).toBeUndefined();
      expect(result.current.successResponse).toEqual(response.data);
      expect(result.current.errorResponse).toBeUndefined();
    });
  });

  it("should return the error response when axios returns an error response", async () => {
    const response = {
      status: 404,
      data: {
        error_code: "<error-code>",
        error_message: "<error-message>",
      },
    };
    mockServiceResponse(response);

    const { result } = setup("<endpoint>");

    await waitFor(() => {
      expect(result.current.error).toBeUndefined();
      expect(result.current.successResponse).toBeUndefined();
      expect(result.current.errorResponse).toEqual(response.data);
    });
  });

  it("should return an error when axios fails to process the request", async () => {
    const error = new Error("error");
    mockServiceResponse(undefined, error);

    const { result } = setup("<endpoint>");

    await waitFor(() => {
      expect(result.current.error).toEqual(error);
      expect(result.current.successResponse).toBeUndefined();
      expect(result.current.errorResponse).toBeUndefined();
    });
  });
});
