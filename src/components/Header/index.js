import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Person from "@material-ui/icons/Person";
import ExitToApp from "@material-ui/icons/ExitToApp";
import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from "@material-ui/icons/Menu";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";


import { useLocation, useHistory } from "react-router-dom";
import { Container, Profile, useStyles } from "./styles";


const Header= ({ handleDrawerToggle }) => {
  let location = useLocation().pathname.split("/").pop();
  let history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Container>
      <AppBar color="inherit" position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          
          <Profile onClick={handleClick}>
            <Avatar className={classes.avatar}>A</Avatar>
            <Typography noWrap>Admin</Typography>
            {Boolean(anchorEl) ? <ExpandLess /> : <ExpandMore />}
          </Profile>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => {}}>
              <Person style={{ marginRight: 16 }} />
              Meu Perfil
            </MenuItem>
            <MenuItem onClick={() => {}}>
              <SettingsIcon style={{ marginRight: 16 }} />
              Configurações
            </MenuItem>
            <MenuItem onClick={() => {}}>
              <ExitToApp style={{ marginRight: 16 }} />
              Sair
            </MenuItem>
            {/*limpar contesto ao sair*/}
          </Menu>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Header;
