import React, { useState, useEffect, useMemo } from "react";
import { useStyles, Container, Header, Body } from "./styles";
import Layout from "../../components/Layout";
import TableLive from "../../components/TableLive";
import RadioButtonChecked from "@material-ui/icons/RadioButtonChecked";
import "../../assets/extra.css?v=1.9.0";
import "../../assets/lol.css?v=1.9.0";

import { Month, Week } from "./utils";
import api from "../../api";

// setMatches([
//   {
//     id: "104372946602479086",
//     startTime: "2020-08-13T10:00:00Z",
//     time: new Date("2020-08-13T10:00:00Z").getHours(),
//     state: "inProgress",
//     type: "match",
//     blockName: "Eliminatórias - Rodada 1",
//     league: {
//       id: "104366947889790212",
//       slug: "pcs",
//       name: "PCS",
//       image:
//         "http://static.lolesports.com/leagues/1592515942679_PCS-01-FullonDark.png",
//       priority: 1000,
//     },
//     match: {
//       id: "104372946602479086",
//       teams: [
//         {
//           id: "104367082616536883",
//           name: "Nova Esports",
//           slug: "nova-esports",
//           code: "NOV",
//           image:
//             "http://static.lolesports.com/teams/1592588738660_NovaEsportsNOV-01-FullonDark.png",
//           result: { outcome: null, gameWins: 0 },
//           record: { wins: 0, losses: 0 },
//         },
//         {
//           id: "104367068120825486",
//           name: "PSG.Talon Esports",
//           slug: "psgtalon-esports",
//           code: "PSG",
//           image:
//             "http://static.lolesports.com/teams/1592515076798_talon-esports.png",
//           result: { outcome: null, gameWins: 0 },
//           record: { wins: 0, losses: 0 },
//         },
//       ],
//       strategy: { type: "bestOf", count: 3 },
//     },
//     count: 1,
//     gameId: "104372946602479087",
//   },
// ]);

const Managers = () => {
  const classes = useStyles();
  const [matches, setMatches] = useState([]);
  var gamesList = [];
  useEffect(() => {
    async function fetchData() {
      const res = await api.get("/getLive?hl=pt-BR", {
        headers: {
          "x-api-key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
        },
      });
      var data = res.data.data.schedule.events.filter((event) => {
        return event.type === "match";
      });
      const getData = async () =>
        Promise.all(
          data.map(async (event) => {
            const res2 = await api.get(
              `/getEventDetails?hl=pt-BR&id=${event.id}`,
              {
                headers: {
                  "x-api-key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
                },
              }
            );
            gamesList = [...gamesList, res2.data.data.event.match.games];
            if (gamesList.length == data.length) {
              gamesList.map((games, index) => {
                games = games.filter((game) => game.state === "inProgress");
                if (games.length > 0) {
                  gamesList[index] = games;
                  data[index].count = games[0].number;
                  data[index].gameId = games[0].id;
                  data[index].time = new Date(data[index].startTime).getHours();
                }
              });
            }
          })
        );
      await getData();
      setMatches(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className={classes.root}>
        <Layout />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container>
            <div style={{ marginBottom: "75px" }}>
              <Header>
                <RadioButtonChecked
                  style={{
                    color: "#fff",
                    height: "1.92857143rem",
                    fontSize: "2.3125rem",
                    lineHeight: "1.92857143rem",
                    marginRight: "5px",
                  }}
                />
                <h1 className={classes.cardTitleWhite}>Ao Vivo</h1>
              </Header>
              <Body>
                <TableLive tableHeaderColor="primary" tableData={matches} />
              </Body>
            </div>
          </Container>
        </main>
      </div>
    </div>
  );
};

export default Managers;
