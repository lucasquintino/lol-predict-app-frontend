import styled from "styled-components";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  font-size: 18px;
  color: #ddd;
  font-family: "Poppins";

  height: 100%;
  background: #000;

  h1 {
    color: #222;
  }
`;

export const Background = styled.img`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 5;
  opacity: 0.2;
  position: absolute;
  object-fit: cover;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: "#fff";
  padding-left: 25px;
`;

export const Image = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

export const StyledLink = styled(NavLink)`
  z-index: 7;
  font-size: 16px;
  color: #ddd;
  display: flex;
  padding: 8px;
  transition: 0.2s;
  text-decoration: none;
  margin: 20px;
  border-radius: 2.5px;

  i {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 30px;
  }
  &:hover {
    background: rgba(	238, 39, 55, 0.85);

    color: #ddd;
    i {
      color: #ddd;
    }
    transition: all 0.2s;
  }
  &:focus {
    background: #ee2737;
    color: #ddd;
    transition: all 0.2s;
  }
  &.active {
    background: #ee2737;
    color: #ddd;
    i {
      color: #ddd;
    }
    transition: all 0.2s;
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
    drawer: {
      border: 'none'
    }
  })
);
