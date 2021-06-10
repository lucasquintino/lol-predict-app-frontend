import React, { useEffect } from "react";

import Divider from "@material-ui/core/Divider";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// Icones da navegação

import Geral from "@material-ui/icons/Dashboard";
import Evento from "@material-ui/icons/LocalActivity";
import LiveTv from "@material-ui/icons/LiveTv";
import CalendarToday from "@material-ui/icons/CalendarToday";

import {
  Container,
  Logo,
  Image,
  StyledLink,
  Background,
  useStyles,
} from "./styles";

import logo from "../../assets/lol.png";
import background from "../../assets/background.png";
import "./index.css";

// import { NavLink } from "react-router-dom";

const list = [
  {
    name: "Horários",
    route: "/schedule",
    icon: <CalendarToday style={{ width: 25, height: 25 }} />,
  },
  {
    name: "Ao Vivo",
    route: "/live",
    icon: <LiveTv style={{ width: 25, height: 25 }} />,
  },
];

const MenuBar = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(-1);

  const handleClick = (index) => {
    if (open === index) setOpen(-1);
    else setOpen(index);
  };

  return (
    <Container>
      <Background src={background} alt="" />
      <Logo className={classes.toolbar}>
        <Image src={logo} alt="provem-logo" />
        LOL PREDICT
      </Logo>

      <Divider style={{ background: "#aaa", margin: '0px 20px' }} />

      <List
        style={{ padding: 0, zIndex: 10 }}
        aria-labelledby="nested-list-subheader"
      >
        {list.map((item, index) => (
          <div key={index}>
            {/* <ListItem
              selected={open === index}
              key={index}
              button
              onClick={() => handleClick(index)}
            >
              <ListItemIcon>
                {item.icon}{" "}
                
              </ListItemIcon>
              <ListItemText primary={item.name} />
              {open === index ? <ExpandLess /> : <ExpandMore />}
            </ListItem> */}
            <StyledLink key={index} onClick={() => {}} to={item.route}>
              <i>{item.icon} </i>
              <h1 style={{ fontSize: 18, color: "#ddd" }}>{item.name}</h1>
            </StyledLink>

            {/* <Collapse in={open === index} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.sub.map((subItem, index) => (
                  <StyledLink
                    key={index}
                    onClick={() => update(true)}
                    to={{
                      pathname: mappingRoute(item.name, subItem),
                      state: { withTabs: mappingTabsOrNot(item.name, subItem) },
                    }}
                  >
                    <i>
                      <StarBorder />
                    </i>
                    <ListItemText primary={subItem} />
                  </StyledLink>
                ))}
              </List>
            </Collapse> */}
          </div>
        ))}
      </List>
    </Container>
  );
};

export default MenuBar;
