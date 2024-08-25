import { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import { createUseStyles } from "react-jss";
import { Input, Space, Tag, Collapse, Button, Divider } from "antd";
import Fade from "@mui/material/Fade";
import { getRandomInt } from "./utils";
import Embedding from "./Embedding";
import CollapseAnimate from "@mui/material/Collapse";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AssignmentIcon from "@mui/icons-material/Assignment";
import _ from "lodash";

const useStyle = createUseStyles({
  body: {
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
  },
  bg: {
    backgroundImage: 'url("./peakpx.jpg")',
    filter: "blur(5px)",
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 1,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  foam: {
    width: "100%",
    height: "100%",
    backgroundColor: "gray",
    position: "absolute",
  },
  form: {
    width: "80%",
    padding: "12px",
    backgroundColor: "rgba(201,208,210, 0.4)",
    zIndex: 2,
    position: "relative",
    margin: "auto",
    borderRadius: 8,
  },
  title: {
    fontSize: "3rem",
    textAlign: "center",
    fontWeight: "bold",
    paddingBlock: 8,
    color: "white",
  },
  bottom: {
    display: "flex",
    gap: 8,
    justifyContent: "flex-end",
  },
  result: {
    width: "100%",
    color: "white",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bolder",
    paddingBlock: 8,
  },
});

const getColorStatus = {
  negative: "#f50",
  neutral: "#1D1D1D",
  positive: "#7cb305",
};

function App() {
  const classes = useStyle();
  const [data, setData] = useState();

  const [isShowResult, setIsShowResult] = useState(false);
  const load = function () {
    fetch("./word_embedding_32_predict.csv")
      .then((response) => response.text())
      .then((responseText) => {
        // -- parse csv
        var data = Papa.parse(responseText);
        setData(data.data);
      });
  };

  const [randomNumber, setRandomNumber] = useState(0);

  useEffect(() => {
    setRandomNumber(data ? getRandomInt(1, 10000) : 0);
  }, [data]);

  const randomDataRow = useMemo(() => {
    return data ? data[randomNumber] : {};
  }, [data, randomNumber]);
  useEffect(() => {
    load();
  }, []);

  return (
    <div className={classes.body}>
      <div className={classes.bg}></div>
      <div className={classes.foam}></div>
      {!_.isEmpty(randomDataRow) && (
        <Fade in={!_.isEmpty(randomDataRow)} mountOnEnter>
          <div className={classes.form}>
            <h1 className={classes.title}>Text Sentiment</h1>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Input.TextArea
                placeholder="text"
                rows={4}
                value={randomDataRow[0]}
                disabled
              ></Input.TextArea>
              <Space>
                <h2 style={{ color: "white" }}>Label: </h2>
                <Tag color={getColorStatus[randomDataRow[3].toLowerCase()]}>
                  {randomDataRow[3]}
                </Tag>
              </Space>
              <Collapse
                items={[
                  {
                    key: "1",
                    label: "Embedding",
                    children: <Embedding rowData={randomDataRow} />,
                  },
                ]}
              />
              <div className={classes.bottom}>
                <Button
                  icon={<AutorenewIcon />}
                  onClick={() => {
                    setIsShowResult(false);
                    setRandomNumber(data ? getRandomInt(1, 10000) : 0);
                  }}
                >
                  Rotate text
                </Button>
                <Button
                  type="primary"
                  icon={<AssignmentIcon />}
                  onClick={() => {
                    setIsShowResult(true);
                  }}
                  disabled={isShowResult}
                >
                  Predict
                </Button>
              </div>
              <CollapseAnimate
                in={isShowResult}
                mountOnEnter
                easing={{ exit: "0ms" }}
              >
                <Divider
                  style={{
                    borderColor:
                      getColorStatus[randomDataRow[36].toLowerCase()],
                    color: getColorStatus[randomDataRow[36].toLowerCase()],
                  }}
                >
                  Result
                </Divider>
                <div
                  className={classes.result}
                  style={{
                    backgroundColor:
                      getColorStatus[randomDataRow[36].toLowerCase()],
                  }}
                >
                  {randomDataRow[36]}
                </div>
              </CollapseAnimate>
            </Space>
          </div>
        </Fade>
      )}
    </div>
  );
}

export default App;
