import styled from "styled-components";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const Header = styled.div`
  color: #fff;
  height: 100px;
  display: flex;
  background: #000;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 0 15px;
  position: relative;
  padding: 15px;
  margin-top: -80px;
  
  border-radius: 3px;
  z-index: 999;
  bottom: -50px;
`;

export const Body = styled.div`
  flex: 1 1 auto;
  padding: 0.9375rem 20px;
  padding-top: 50px;
  position: relative;
  background: #0f1519;
  -webkit-box-flex: 1;
`;

export const Container = styled.div`
  width: 100%;
  margin: 50px auto;
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 0;
  left: 0;
  background: #0a0e13;
  .header {
    padding: 0;
  }
`;

export const Title = styled.div`
  font-size: 26px;
  color: #ff4000;
  font-family: "Roboto slab", sans-serif;
  text-align: center;
  padding: 30px 0;
`;

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      background: "#0a0e13",
      flexGrow: 1,
      width: 1,
      minHeight:' 100vh',
      height: "100%",
      padding: theme.spacing(3),
      "@media (max-width:480px)": {
        padding: theme.spacing(2),
      },
    },
    cardCategoryWhite: {
      "&,& a,& a:hover,& a:focus": {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        marginTop: "0",
        marginBottom: "0",
      },
      "& a,& a:hover,& a:focus": {
        color: "#FFFFFF",
      },
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontFamily: "Poppins",
      fontWeight: "semi-bold",
      lineHight: "2.9857143",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1",
      },
    },
  })
);
