import React, { useState, useEffect, useMemo } from "react";
import { useStyles, Container, Header, Body } from "./styles";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import TableHistory from "../../components/TableHistory";
import "../../assets/extra.css?v=1.9.0";
import "../../assets/lol.css?v=1.9.0";

import { Month, Week } from "./utils";
import axios from "axios";

const Managers = () => {
  const classes = useStyles();
  const [matches, setMatches] = useState([]);
  const [team, setTeam] = useState();
  let { teamName } = useParams();

  useEffect(() => {
    async function fetchData() {
      let res;
      let res2;
      try {
        res2 = await axios.get(
          `https://tgt7ghqvcb.execute-api.us-west-2.amazonaws.com/prod/teams/${teamName}`,
          {
            headers: {
              "x-api-key": "f561197a-82ea-4e54-acd2-386979018a7a",
            },
          }
        );
      } catch (error) {

        teamName = teamName.split(" ")[0];
        res2 = await axios.get(
          `https://tgt7ghqvcb.execute-api.us-west-2.amazonaws.com/prod/teams/${
            teamName.split(" ")[0]
          }`,
          {
            headers: {
              "x-api-key": "f561197a-82ea-4e54-acd2-386979018a7a",
            },
          }
        );
      }

      res = await axios.get(
        `https://tgt7ghqvcb.execute-api.us-west-2.amazonaws.com/prod/teams/gameDetails/${teamName}`,
        {
          headers: {
            "x-api-key": "f561197a-82ea-4e54-acd2-386979018a7a",
          },
        }
      );


      setMatches(res?.data);
      setTeam(res2?.data);
    }
    fetchData();
  }, [teamName]);



  return (
    <div>
      <div className={classes.root}>
        <Layout />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container>
            <div style={{ marginBottom: "75px" }}>
              <Header color="rose">
                <h1 className={classes.cardTitleWhite}>{team?.name}</h1>
                <h3 className={classes.cardCategoryWhite}>
                  {team?.league} - {team?.region}
                </h3>
              </Header>
              <Body>
                <TableHistory
                  tableHeaderColor="primary"
                  tableData={matches}
                  team={team}
                />
              </Body>
            </div>
          </Container>
        </main>
      </div>
    </div>
  );
};

export default Managers;
