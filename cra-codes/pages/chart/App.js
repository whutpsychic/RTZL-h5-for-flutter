import React from "react";
import hf from "../core/index.js";
import REchart from "echarts-for-react";
import "./App.css";

// =============== 注册flutter端使用函数 ===============
hf.register("getOption", (obj) => {
  window.chartInstance.setOption(obj);
});

// =============== 注册flutter端使用函数 ===============

class App extends React.Component {
  constructor() {
    super();
    window.chartInstance = this;
  }

  state = {
    chartOption: {},
  };

  componentDidMount() {
    // componentDidMount报告
    hf.traceback("componentDidMount");
  }

  render() {
    const { chartOption } = this.state;
    return (
      <div className="main-container">
        <div id="chart" className="chart-container">
          <REchart
            // echarts={echarts}
            style={{ height: "100%", width: "100%" }}
            option={chartOption}
            notMerge={true}
            lazyUpdate={true}
            onChartReady={this.onChartReadyCallback}
            // onEvents={EventsDict}
            // opts={}
          />
        </div>
      </div>
    );
  }

  setOption = (obj) => {
    this.setState({
      chartOption: obj,
    });
  };

  onChartReadyCallback = () => {};
}

export default App;
