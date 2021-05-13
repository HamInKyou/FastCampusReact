import React from "react";
import Button from "./components/Button";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <div className="buttons">
        <Button size="large">button</Button>
        <Button>button</Button>
        <Button size="small">button</Button>
      </div>
      <div className="buttons">
        <Button color="gray" size="large">
          button
        </Button>
        <Button color="gray">button</Button>
        <Button color="gray" size="small">
          button
        </Button>
      </div>
      <div className="buttons">
        <Button color="pink" size="large">
          button
        </Button>
        <Button color="pink">button</Button>
        <Button color="pink" size="small">
          button
        </Button>
      </div>

      <div className="buttons">
        <Button size="large" outline>
          button
        </Button>
        <Button color="gray" outline>
          button
        </Button>
        <Button color="pink" size="small" outline>
          button
        </Button>
      </div>

      <div className="buttons">
        <Button size="large" fullWidth>
          button
        </Button>
        <Button color="gray" fullWidth>
          button
        </Button>
        <Button
          color="pink"
          size="small"
          fullWidth
          onClick={() => console.log("클릭!")}
          onMouseMove={() => console.log("마우스 무브!")}
        >
          button
        </Button>
      </div>
    </div>
  );
}

export default App;
