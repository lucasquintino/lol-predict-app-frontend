import React, { useState, useEffect, useMemo } from "react";
import { useStyles, Container, Header, Body } from "./styles";
import Layout from "../../components/Layout";
import Table from "../../components/Table";
import "../../assets/extra.css?v=1.9.0";
import "../../assets/lol.css?v=1.9.0";

import { Month, Week } from "./utils";
import api from "../../api";

const Managers = () => {
  const classes = useStyles();
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await api.get("/getSchedule?hl=pt-BR", {
        headers: {
          "x-api-key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
        },
      });
      var data = res.data.data.schedule.events.filter((event) => {
        return event.state === "unstarted";
      });
      data.map((event) => {
        event.time = new Date(event.startTime).getHours();
        event.day = new Date(event.startTime).getDate();
        event.week = new Date(event.startTime).getDay();
        event.month = new Date(event.startTime).getMonth();
      });
      Array.prototype.groupBy = function (k) {
        return this.reduce(
          (acc, item) => (
            (acc[item[k]] = [...(acc[item[k]] || []), item]), acc
          ),
          []
        );
      };
      data = data.groupBy("day");
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
            {matches.map((item) => (
              <div style={{ marginBottom: "75px" }}>
                <Header color="rose">
                  <h1 className={classes.cardTitleWhite}>
                    {Week[item[0].week]}
                  </h1>
                  <h3 className={classes.cardCategoryWhite}>
                    {item[0].day} de {Month[item[0].month]}
                  </h3>
                </Header>
                <Body>
                <Table
                tableHeaderColor="primary"
                tableData={item.map((match) => [
                  match.time,
                  match.match.teams,
                  match.league.name,
                ])}
              />
                </Body>
              </div>
            ))}
          </Container>
        </main>
      </div>
    </div>
  );
};

export default Managers;
