import { NavLink } from "react-router";

const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "All Artifacts",
    url: "/all-artifacts",
  },
  {
    name: "Add Artifact",
    url: "/add-artifacts",
  },
];

export const navItems = navItemsData.map((item) => (
  <NavLink key={item.name} to={item.url}>
    {item.name}
  </NavLink>
));
