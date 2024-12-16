import { useState } from "react";
import { Person } from "../../../models/People";
import useService from "../../../api/useService/useService";
import { PEOPLE_ENDPOINT } from "../../../api/endpoints";
import ErrorDialog from "../../ErrorDialog/ErrorDialog";
import Spinner from "../../Spinner/Spinner";
import { Params } from "../../../models/parameters";
import Table, { Header } from "../../Table/Table";

/** A list with the table headers of the people properties. */
const PEOPLE_HEADER: Header[] = [
  { field: "name", label: "Name", format: "string" },
  { field: "birth_year", label: "Birth year", format: "string" },
  { field: "eye_color", label: "Eye color", format: "string" },
  { field: "gender", label: "Gender", format: "string" },
  { field: "hair_color", label: "Hair color", format: "string" },
  { field: "height", label: "Height", format: "string" },
  { field: "mass", label: "Mass", format: "string" },
  { field: "skin_color", label: "Skin color", format: "string" },
  { field: "created", label: "Creation date", format: "date" },
  { field: "edited", label: "Edit date", format: "date" },
];

/**
 * A component to render the characters from the Star Wars universe. It renders
 * a table with support for sorting, pagination and filtering, and calls the
 * service with the right parameters to keep the table content synced with the
 * table properties.
 *
 * It renders a spinner while the service is processing the requests and an
 * error dialog when an error occurres.
 */
const PeopleTable = () => {
  const [params, setParams] = useState<Params>();
  const {
    successResponse: people,
    errorResponse,
    error,
  } = useService<Person[]>(PEOPLE_ENDPOINT, params);
  const isLoading =
    people === undefined && errorResponse === undefined && error === undefined;
  const isError = errorResponse !== undefined || error !== undefined;

  const handleDialogClose = () => {
    window.location.reload();
  };

  if (isLoading)
    return (
      <div data-testid="people-table-spinner">
        <Spinner />
      </div>
    );

  return isError ? (
    <div data-testid="people-table-error-dialog">
      <ErrorDialog
        title="Error during request"
        message="There was an error while requesting for the characters. Please, try again."
        buttonText="Refresh"
        onClose={handleDialogClose}
      />
    </div>
  ) : (
    <div data-testid="people-table-table">
      <Table
        title="Star Wars characters"
        // I can do the castings here because if people was undefined, the
        // ErrorDialog would be rendered instead.
        count={people?.count as number}
        rows={people?.data as Person[]}
        headers={PEOPLE_HEADER}
        onParamsChange={setParams}
      />
    </div>
  );
};

export default PeopleTable;
