import { stringToSortField, SUPPORTED_SORT_FIELDS } from "./parameters";

describe("stringToSortField()", () => {
  it("should return the field when it is in the SUPPORTED_SORT_FIELDS array", () => {
    const field = SUPPORTED_SORT_FIELDS[0];
    const res = stringToSortField(field);

    expect(res).toEqual(field);
  });

  it("should return undefined when it not is in the SUPPORTED_SORT_FIELDS array", () => {
    const field = "<random-field>";
    const res = stringToSortField(field);

    expect(res).toBeUndefined();
  });
});
