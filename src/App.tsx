import AppBar from "./components/AppBar/AppBar";
import TabsMenu from "./components/TabsMenu/TabsMenu";
import PeopleTable from "./components/People/PeopleTable/PeopleTable";
import { Box } from "@mui/material";

/** A list with the tabs the application supports. */
const APP_TABS = [
  { label: "people", content: <PeopleTable /> },
  { label: "planets", content: <div>Planets</div> },
];

const App = () => (
  <Box>
    <AppBar header="Star Wars app" />
    <Box sx={{ width: "100%" }}>
      <TabsMenu elements={APP_TABS} />
    </Box>
  </Box>
);

export default App;
