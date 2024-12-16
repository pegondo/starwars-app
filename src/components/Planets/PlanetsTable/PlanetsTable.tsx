import { useState } from "react";
import useService from "../../../api/useService/useService";
import ErrorDialog from "../../ErrorDialog/ErrorDialog";
import Spinner from "../../Spinner/Spinner";
import { Params } from "../../../models/parameters";
import Table, { Header } from "../../Table/Table";
import { Planet } from "../../../models/Planet";
import { PLANETS_ENDPOINT } from "../../../api/endpoints";

/** A list with the table headers of the planet properties. */
const PLANETS_HEADER: Header<Planet>[] = [
  { field: "name", label: "Name", format: "string" },
  { field: "diameter", label: "Diameter", format: "string" },
  { field: "rotation_period", label: "Rotation period", format: "string" },
  { field: "orbital_period", label: "Orbital period", format: "string" },
  { field: "gravity", label: "Gravity", format: "string" },
  { field: "population", label: "Population", format: "string" },
  { field: "climate", label: "Climate", format: "string" },
  { field: "terrain", label: "Terrain", format: "string" },
  { field: "surface_water", label: "Surface water", format: "string" },
  { field: "created", label: "Creation date", format: "date" },
  { field: "edited", label: "Edit date", format: "date" },
];

/**
 * A component to render the planets from the Star Wars universe. It renders
 * a table with support for sorting, pagination and filtering, and calls the
 * service with the right parameters to keep the table content synced with the
 * table properties.
 *
 * It renders a spinner while the service is processing the requests and an
 * error dialog when an error occurres.
 */
const PlanetsTable = () => {
  const [params, setParams] = useState<Params>();
  const {
    successResponse: planets,
    errorResponse,
    error,
  } = useService<Planet[]>(PLANETS_ENDPOINT, params);
  const isLoading =
    planets === undefined && errorResponse === undefined && error === undefined;
  const isError = errorResponse !== undefined || error !== undefined;

  const handleDialogClose = () => {
    window.location.reload();
  };

  if (isLoading)
    return (
      <div data-testid="planets-table-spinner">
        <Spinner />
      </div>
    );

  return isError ? (
    <div data-testid="planets-table-error-dialog">
      <ErrorDialog
        title="Error during request"
        message="There was an error while requesting for the planets. Please, try again."
        buttonText="Refresh"
        onClose={handleDialogClose}
      />
    </div>
  ) : (
    <div data-testid="planets-table-table">
      <Table
        title="Star Wars planets"
        // I can do the castings here because if planets was undefined, the
        // ErrorDialog would be rendered instead.
        count={planets?.count as number}
        rows={planets?.data as Planet[]}
        headers={PLANETS_HEADER}
        onParamsChange={setParams}
      />
    </div>
  );
};

export default PlanetsTable;
