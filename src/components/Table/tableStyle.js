const primaryColor = ["#9c27b0", "#ab47bc", "#8e24aa", "#af2cc5"];
const warningColor = ["#ff9800", "#ffa726", "#fb8c00", "#ffa21a"];
const dangerColor = ["#f44336", "#ef5350", "#e53935", "#f55a4e"];
const successColor = ["#4caf50", "#66bb6a", "#43a047", "#5cb860"];
const infoColor = ["#00acc1", "#26c6da", "#00acc1", "#00d3ee"];
const roseColor = ["#e91e63", "#ec407a", "#d81b60", "#eb3573"];
const grayColor = [
  "#999",
  "#777",
  "#3C4858",
  "#AAAAAA",
  "#D2D2D2",
  "#DDD",
  "#b4b4b4",
  "#555555",
  "#333",
  "#a9afbb",
  "#eee",
  "#e7e7e7"
];
const defaultFont = {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "300",
    lineHeight: "1.5em"
  };
  
  
  const tableStyle = theme => ({
    warningTableHeader: {
      color: warningColor[0]
    },
    primaryTableHeader: {
      color: primaryColor[0]
    },
    dangerTableHeader: {
      color: dangerColor[0]
    },
    successTableHeader: {
      color: successColor[0]
    },
    infoTableHeader: {
      color: infoColor[0]
    },
    roseTableHeader: {
      color: roseColor[0]
    },
    grayTableHeader: {
      color: grayColor[0]
    },
    table: {
      marginBottom: "0",
      width: "100%",
      maxWidth: "100%",
      backgroundColor: "transparent",
      borderSpacing: "0",
      borderCollapse: "collapse"
    },
    tableHeadCell: {
      color: "inherit",
      ...defaultFont,
      fontFamily: 'Poppins',
      "&, &$tableCell": {
        fontSize: "1em"
      }
    },
    tableCell: {
      ...defaultFont,
      height:'100px',
      fontFamily: 'Poppins',
      lineHeight: "1.42857143",
      padding: "12px 8px",
      verticalAlign: "middle",
      fontSize: "0.8125rem",
    },
    tableCellTime: {
      ...defaultFont,
      height:'100px',
      fontFamily: 'Poppins',
      fontWeight:'semi-bold',
      lineHeight: "1.42857143rem",
      verticalAlign: "middle",
      color:'white',
      fontSize: "2.1125rem",
      minWidth:'8.5vw',
    },
    tableCellTeams: {
      ...defaultFont,
      height:'100px',
      fontFamily: 'Poppins',
      fontWeight:'semi-bold',
      lineHeight: "1.42857143",
      padding: "12px 8px",
      color:'white',
      verticalAlign: "middle",
      fontSize: "1.7125rem",
      width:'3000px'
  
    },
    tableCellLeague: {
      ...defaultFont,
      height:'100px',
      fontFamily: 'Poppins',
      lineHeight: "1.42857143",
      padding: "12px 8px",
      verticalAlign: "middle",
      fontSize: "2.1125rem",
      minWidth:'7vw',
  
      color:'white',
    },
    tableResponsive: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto"
    },
    tableHeadRow: {
      height: "56px",
      color: "inherit",
      display: "table-row",
      outline: "none",
      verticalAlign: "middle",
    },
    tableBodyRow: {
      height: "48px",
      color: "inherit",
      display: "table-row",
      outline: "none",
      verticalAlign: "middle",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      maxWidth: "100%",
    }
  });
  
  export default tableStyle;
  