import React from "react";
import Plot from 'react-plotly.js';
import InputBar from "../Components/InputBar";

function LiveStreamRaceData() {
    const [buttonStates, setButtonStates] = React.useState({
        showAll: false,
        hideAll: false,

        showWheelPlot: false,
        showThrottlePlot: false,
        showBrakePlot: false,
        showGearPlot: false,

        showWheelValue: false,
        showThrottleValue: false,
        showBrakeValue: false,
        showGearValue: false
    });

    const [wheelData, setWheelData] = React.useState([]);
    const [brakeData, setBrakeData] = React.useState([]);
    const [throttleData, setThrottleData] = React.useState([]);
    const [gearData, setGearData] = React.useState([]);

    const [wheelDataRange, setWheelDataRange] = React.useState([]);
    const [brakeDataRange, setBrakeDataRange] = React.useState([]);
    const [throttleDataRange, setThrottleDataRange] = React.useState([]);
    const [gearDataRange, setGearDataRange] = React.useState([]);

    const [wheelValue, setWheelValue] = React.useState(50);
    const [brakeValue, setBrakeValue] = React.useState(0);
    const [throttleValue, setThrottleValue] = React.useState(0);
    const [gearValue, setGearValue] = React.useState(0);

    const plotScale = 300;

    const handleButtonClick = (buttonId) => {
        if (buttonId === 'showAll') {
            setButtonStates(() => ({
                showAll: true,
                hideAll: false,
                showWheelPlot: true,
                showThrottlePlot: true,
                showBrakePlot: true,
                showGearPlot: true,        
            }));
        } else if (buttonId === 'hideAll') {
            setButtonStates(() => ({
                showAll: false,
                hideAll: true,
                showWheelPlot: false,
                showThrottlePlot: false,
                showBrakePlot: false,
                showGearPlot: false,        
            }));
        } else {
            setButtonStates((prevButtonStates) => ({
                ...prevButtonStates,
                showAll: false,
                hideAll: false,
                [buttonId]: !prevButtonStates[buttonId],
            }));
        }
    };

  return (
      <main>
        <h1>Live Stream Race Data</h1>
        <br/><br/>
        <div>
            <button 
                className={buttonStates.showAll ? 'button active' : 'button inactive'}
                onClick={() => handleButtonClick('showAll')}>
                    Show All
            </button>
            <button 
                className={buttonStates.hideAll ? 'button active' : 'button inactive'}
                onClick={() => handleButtonClick('hideAll')}>
                    Hide All
            </button>
            <button 
                className={buttonStates.wheelPlot ? 'button active' : 'button inactive'}
                onClick={() => handleButtonClick('showWheelPlot')}>
                    Wheel Plot
            </button>
            <button 
                className={buttonStates.throttlePlot ? 'button active' : 'button inactive'}
                onClick={() => handleButtonClick('showThrottlePlot')}>
                    Throttle Plot
            </button>
            <button 
                className={buttonStates.brakePlot ? 'button active' : 'button inactive'}
                onClick={() => handleButtonClick('showBrakePlot')}>
                    Brake Plot
            </button>
            <button 
                className={buttonStates.gearPlot ? 'button active' : 'button inactive'}
                onClick={() => handleButtonClick('showGearPlot')}>
                    Gear Plot
            </button>
        </div>
        {buttonStates.wheelPlot && <Plot
          data={[
            {
              x: wheelDataRange,
              y: wheelData,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            },
          ]}
          layout={ {width: plotScale, height: plotScale, title: 'Wheel Data'} }
        />}
        {buttonStates.brakePlot && <Plot
          data={[
            {
              x: brakeDataRange,
              y: brakeData,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            },
          ]}
          layout={ {width: plotScale, height: plotScale, title: 'Brake Data'} }
        />}
        {buttonStates.throttlePlot && <Plot
          data={[
            {
              x: throttleDataRange,
              y: throttleData,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            },
          ]}
          layout={ {width: plotScale, height: plotScale, title: 'Throttle Data'} }
        />}
        {buttonStates.gearPlot && <Plot
          data={[
            {
              x: gearDataRange,
              y: gearData,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            },
          ]}
          layout={ {width: plotScale, height: plotScale, title: 'Gear Data'} }
        />}
        <br/>
      </main>
  );
}
  
export default LiveStreamRaceData;