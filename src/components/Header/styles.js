import styled from "styled-components";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const drawerWidth = 300;

export const Container = styled.div`
  /* position: absolute;
  z-index: 0; */
  h1 {
    font-size: 18px;
    font-weight: lighter;
    color: #222
  }
`;

export const Profile = styled.button`
  background: transparent;
  cursor: pointer;
  border: none;
  outline: none;
  width: 150px;
  margin-left: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Estilos aplicados em MUI componentes
export const useStyles = makeStyles((theme) =>
  createStyles({
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
      background: '#fafafa',
      boxShadow: "0 5px 5px -3px rgba(0,0,0,0.14)",
      textTransform: "capitalize",
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    avatar: {
      background: "#692177",
    },
  })
);
