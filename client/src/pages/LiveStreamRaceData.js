import React, { useEffect, useState } from "react";
import Plot from 'react-plotly.js';
import InputBar from "../Components/InputBar";

function LiveStreamRaceData() {
    const [response, setResponse] = React.useState("Waiting to start live stream...");
    const [intervalId, setIntervalId] = useState(0);

    const [socket, setSocket] = useState(null);

    useEffect(() => {
      if (socket) {
        var currentX = 0;
        socket.onmessage = (event) => {
          let valuePair = event.data.split(" ");
          switch(parseInt(valuePair[0])) {
            case 0:
              setWheelValue(valuePair[1]);
              setWheelData((prevArray) => [...prevArray, valuePair[1]]);
              setWheelDataRange((prevArray) => [...prevArray, currentX]);
              currentX++;
              break;
            case 1:
              setThrottleValue(valuePair[1]);
              setThrottleData((prevArray) => [...prevArray, valuePair[1]]);
              setThrottleDataRange((prevArray) => [...prevArray, currentX]);
              currentX++;
              break;
            case 2:
              setBrakeValue(valuePair[1]);
              setBrakeData((prevArray) => [...prevArray, valuePair[1]]);
              setBrakeDataRange((prevArray) => [...prevArray, currentX]);
              currentX++;
              break;
          }
        };
      }
    }, [socket]);

    const handleStartStream = async () => {
      setButtonStates(() => ({
        startLiveStream: true,
        endLiveStream: false      
      }));

      const newSocket = new WebSocket('ws://localhost:8080');
      newSocket.onopen = () => {
        newSocket.send('start'); // Start the data stream
      };
      setSocket(newSocket);
    };
  
    const handleEndStream = async () => {
      setButtonStates(() => ({
        startLiveStream: false,
        endLiveStream: true     
      }));

      clearInterval(intervalId);

      if (socket) {
        socket.send('end'); // Stop the data stream
        socket.close();
        setSocket(null);
      }
    };

    const [buttonStates, setButtonStates] = React.useState({
        startLiveStream: false, 
        endLiveStream: false,

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

    const [wheelValue, setWheelValue] = React.useState(0);
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
        <div>
            <button 
                className={buttonStates.startLiveStream ? 'button active' : 'button inactive'}
                onClick={() => { handleStartStream() } }>
                    Start Live Stream
            </button>
            <button 
                className={buttonStates.endLiveStream ? 'button active' : 'button inactive'}
                onClick={() => { handleEndStream() } }>
                    End Live Stream
            </button>
            <br/><br/>
            <div>{response}</div>
        </div>
        <br/>
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
                className={buttonStates.showWheelPlot ? 'button active' : 'button inactive'}
                onClick={() => handleButtonClick('showWheelPlot')}>
                    Wheel Plot
            </button>
            <button 
                className={buttonStates.showThrottlePlot ? 'button active' : 'button inactive'}
                onClick={() => handleButtonClick('showThrottlePlot')}>
                    Throttle Plot
            </button>
            <button 
                className={buttonStates.showBrakePlot ? 'button active' : 'button inactive'}
                onClick={() => handleButtonClick('showBrakePlot')}>
                    Brake Plot
            </button>
            <button 
                className={buttonStates.showGearPlot ? 'button active' : 'button inactive'}
                onClick={() => handleButtonClick('showGearPlot')}>
                    Gear Plot
            </button>
        </div>
        {buttonStates.showWheelPlot && <Plot
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
        {buttonStates.showBrakePlot && <Plot
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
        {buttonStates.showThrottlePlot && <Plot
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
        {buttonStates.showGearPlot && <Plot
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
        <InputBar name="Wheel Data" input={wheelValue}/>
        <InputBar name="Throttle Data" input={throttleValue}/>
        <InputBar name="Brake Data" input={brakeValue}/>
      </main>
  );
}
  
export default LiveStreamRaceData;