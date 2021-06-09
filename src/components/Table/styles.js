import styled from "styled-components";
import { MTableBodyRow, MTableFilterRow } from "material-table";
import { createMuiTheme } from "@material-ui/core/styles";

export const Toolbar = styled.div`
  padding: 5px 0px;
  font-size: 18px;
  background: #fafafa;
  border-radius: 10px;
`;

export const Container = styled.div`
  font-family: "Roboto";
  width: 100%;
  background: #fafafa;
  border-radius: 10px;
  margin-bottom: 24px;
  &::-webkit-scrollbar-thumb {
    background-color: white !important;
    outline: 1px solid slategrey;
  }
  table:first-child {
    tr:first-child {
      background: #fafafa !important;
      td:first-child {
        background: #fafafa !important;
      }
    }
    tr {
      td:first-child,
      th:first-child {
        padding: 0 20px !important;
        background-color: #fff !important;
        position: sticky !important;
        left: 0 !important;
        z-index: 999 !important;
        box-shadow: inset -2px 0 0 rgba(224, 224, 224, 0.5);
        /* box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.2) !important */
      }
      th:first-child {
        background-color: #eee !important;
        box-shadow: inset -2px 0 0 rgba(224, 224, 224, 0.75);
        z-index: 999 !important;
      }
    }
  }
`;

export const Row = styled(MTableBodyRow)`
  background: #fff;
  text-align: start;

  &:hover {
    background: #fafafa;
  }
`;

export const FilterRow = styled(MTableFilterRow)`
  background: #000;
  text-align: start;

  &:hover {
    background: #fafafa;
  }
`;

export const Title = styled.h4`
  margin-bottom: 0;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

// Temas usados para estilizar a tabela
export const theme = createMuiTheme({
  overrides: {
    MuiDialog: {
      paperWidthLg: {
        maxWidth: "70vw",
      },
    },
    MuiMenu: {
      paper:{
        top:'16px !important'
      }
    },
    MuiTableCell: {
      root: {
        fontFamily: "Roboto",
        fontSize: "16px",
        height: "75px",
        padding: "20px",
        paddingLeft: "40px",
        borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
        whiteSpace: "nowrap",
        "@media (max-width:480px)": {
          height: "50px",
          paddingLeft: "30px",
        },
      },
    },
    MuiTableSortLabel: {
      root: {
        fontSize: "16px",
        width: "max-content",
      },
    },
    MuiPaper: {
      rounded: {
        border: "1px solid rgba(224, 224, 224, 0.5)",
        borderRadius: "10px !important",
        boxShadow:
          "0 2px 0 rgba(90,97,105,.11), 0 4px 8px rgba(90,97,105,.12), 0 10px 10px rgba(90,97,105,.06), 0 7px 70px rgba(90,97,105,.1) !important",

        "@media (max-width:480px)": {
          borderRadius: "0px !important",
        },
      },
    },
    MuiPopover: {
      paper: {
        top: "300px !important",
        "@media (max-width:480px)": {
          top: "275px !important",
        },
      },
    },
    MuiInput: {
      underline: {
        padding: "2.5px",
        "&::after": {
          position: "absolute",
          transform: " scaleX(0)",
          transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
          borderBottom: "2px solid red",
          left: 0,
          right: 0,
          bottom: 0,
          content: "",
          padding: "10px 0px 5px 5px",
        },
        "@media (max-width:480px)": {
          padding: "0px",
          width: "200px",
        },
      },
    },

    MuiFormControl: {
      root: {
        paddingLeft: "0px !important",
      },
    },
    MuiIconButton: {
      root: {
        "@media (max-width:480px)": {
          padding: "0px",
          paddingLeft: "10px",
        },
      },
    },
  },
});
