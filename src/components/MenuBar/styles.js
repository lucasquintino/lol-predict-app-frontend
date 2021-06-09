import styled from "styled-components";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

export const Container = styled.div`

  h1 {
    color: #222;
  }
`;
export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: "#fff";
  
`;

export const Image = styled.img`
  width: 80%;
  height: 65px;
  padding: 20px 0
`;

export const StyledLink = styled(NavLink)`
  color: #111;
  display: flex;
  padding: 8px 30px;
  transition: 0.2s;
  text-decoration: none;
  i {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 30px;
  }
  &:hover {
    transition: 0.2s;
    background: rgba(0, 0, 0, 0.04);
    color: #692177;
    i {
      transition: 0.2s;
      color: #692177;
    }
  }
  &:focus {
    border-right: 4px solid #692177;
    transition: border-right 0.1s;
  }
  &.active {
    color: #692177;
    transition: border-right 0.2s;
    border-right: 4px solid #692177;
    background: rgba(0, 0, 0, 0.04);
    i {
      color: #692177;
    }
  }
`;

// Estilos aplicados em MUI componentes
export const useStyles = makeStyles((theme) =>
  createStyles({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);
