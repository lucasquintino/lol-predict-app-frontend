import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import MaterialTable, {
  MTableToolbar,
  MaterialTableProps,
} from "@material-table/core";

import { useLocation } from "react-router-dom";

import { ThemeProvider } from "@material-ui/styles";
import { Container, Toolbar, Row, FilterRow, theme } from "./styles";

const Table = ({ columns, data, title, setRefresh, refresh }) => {
  const history = useHistory();
  const location = useLocation();
  const path = useMemo(() => location.pathname, [location]);

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <MaterialTable
          title={title}
          columns={columns}
          data={data}
          actions={[
            {
              icon: "refresh",
              tooltip: "Atualizar",
              isFreeAction: true,
              onClick: (event) => {
                setRefresh(!refresh);
              },
            },
          ]}
          options={{
            headerStyle: {
              background: "#eeeeee",
            },
          }}
          localization={{
            body: {
              emptyDataSourceMessage: "Nenhum registro para exibir",
            },
            toolbar: {
              searchTooltip: "Pesquisar",
              searchPlaceholder: "Filtrar",
              exportTitle: "Exportar",
            },
            pagination: {
              labelRowsSelect: "linhas",
              labelDisplayedRows: "{count} de {from}-{to}",
              firstTooltip: "Primeira página",
              previousTooltip: "Página anterior",
              nextTooltip: "Próxima página",
              lastTooltip: "Última página",
            },
          }}
          // localization={
          //   window.innerWidth > 480
          //     ? {
          //         toolbar: { searchPlaceholder: "Filtrar" },
          //       }
          //     : {
          //         toolbar: { searchPlaceholder: "" },
          //       }
          // }

          components={{
            Toolbar: (props) => (
              <Toolbar>
                <MTableToolbar {...props} />
              </Toolbar>
            ),
            Row: (props) => <Row {...props} />,
          }}
        />
      </ThemeProvider>
    </Container>
  );
};

export default Table;
