import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

/** Represents an element of the table menu. */
type TabElement = {
  label: string;
  content: JSX.Element;
};

/** An interface that represents the properties of the TabsMenu component. */
export type Props = {
  /** The list of tab elements to render. */
  elements: TabElement[];
};

/** A component that renders a tabs menu. */
const TabsMenu = ({ elements }: Props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ width: "100%", border: "1px solid lightgray" }}
      data-testid="tabs-menu"
    >
      <Box sx={{ padding: 1 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            {elements.map(({ label }, index) => (
              <Tab
                label={label}
                key={`tab-${index}`}
                data-testid="tabs-menu-label"
              />
            ))}
          </Tabs>
        </Box>
        {elements.map(({ content }, index) => (
          <div key={`tab-content-${index}`} data-testid="tabs-menu-content">
            {index === value && content}
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default TabsMenu;
