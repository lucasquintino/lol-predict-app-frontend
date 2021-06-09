import styled from "styled-components";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const drawerWidth = 300;

export const Container = styled.div``;

// Estilos aplicados em MUI componentes
export const useStyles = makeStyles((theme) =>
  createStyles({
    drawer: {
      textTransform: "capitalize",
      overflowY: "hidden",
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      boxShadow: "5px 0 5px 2px rgba(0,0,0,0.25)",
      border: 'none',
      width: drawerWidth,
    },
  })
);
