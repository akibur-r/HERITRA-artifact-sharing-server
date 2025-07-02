import { NavLink } from "react-router";

const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Explore",
    url: "/artifacts",
  },
];

export const navItems = navItemsData.map((item) => (
  <NavLink key={item.name} to={item.url}>
    {item.name}
  </NavLink>
));
