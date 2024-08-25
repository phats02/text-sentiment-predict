/* eslint-disable react/prop-types */
import { Space, Input } from "antd";
import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    rowGap: 8,
    maxHeight: "20vh",
    overflowX: "auto",
  },
});

const Embedding = (props) => {
  const { rowData } = props;
  const classes = useStyle();

  return (
    <div className={classes.container}>
      {Array(32)
        .fill(0)
        .map((_, index) => (
          <Space key={index}>
            <div>{("0" + (index + 1)).slice(-2) + "."}</div>
            <Input value={rowData[index + 4]} disabled></Input>
          </Space>
        ))}
    </div>
  );
};

export default Embedding;
