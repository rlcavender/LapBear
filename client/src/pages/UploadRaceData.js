import EditableTable from "../Components/EditableTable";
import React from "react";
import Plot from 'react-plotly.js';

function UploadRaceData() {
  const [wheelData, setWheelData] = React.useState([]);
  const [brakeData, setBrakeData] = React.useState([]);
  const [throttleData, setThrottleData] = React.useState([]);
  const [gearData, setGearData] = React.useState([]);

  const [wheelDataRange, setWheelDataRange] = React.useState([]);
  const [brakeDataRange, setBrakeDataRange] = React.useState([]);
  const [throttleDataRange, setThrottleDataRange] = React.useState([]);
  const [gearDataRange, setGearDataRange] = React.useState([]);

  const [fileName, setFileName] = React.useState('');

  const plotScale = 500;

  const separateByIdentifier = (values, identifier) => {
    var wRange = [];
    var bRange = [];
    var tRange = [];
    var gRange = [];

    var result = [];
    var index = 0;
    for (let i = 0; i < values.length; i++) {
      if (values[i][0] === identifier) {
        // values.slice(index, 1);
        switch (identifier) {
          case 'W':
            wRange.push(i);
            break;
          case 'B':
            bRange.push(i);
            break;
          case 'T':
            tRange.push(i);
            break;
          case 'G':
            gRange.push(i);
            break;
        }
        result[index] = parseFloat(values[i].replace(identifier, ""));
        index++;
      }
    }
    switch(identifier) {
      case 'W':
        setWheelDataRange(wRange);
        break;
      case 'B':
        setBrakeDataRange(bRange);
        break;
      case 'T':
        setThrottleDataRange(tRange);
        break;
      case 'G':
        setGearDataRange(gRange);
        break;
    }
    return result;
  }

  const parseData = (rawData) => {
    var values = rawData.split("\",\"");
    values = values.slice(1, -1);

    var wheelData = separateByIdentifier(values, "W");
    var brakeData = separateByIdentifier(values, "B");
    var throttleData = separateByIdentifier(values, "T");
    var gearData = separateByIdentifier(values, "G");

    setWheelData(wheelData);
    setBrakeData(brakeData);
    setThrottleData(throttleData);
    setGearData(gearData);
      
    // draw race track approximation
    var canvas = document.getElementById('trackCanvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      // for each wheel value, create an [x, y] coordinate pair
      var startCoords = [475, 475];
      var plotPoints = [[]];
      for (let i = 0; i < wheelData.length; i++) {
        plotPoints[i] = [i, wheelData[i]];
      }

      ctx.beginPath();
      ctx.moveTo.apply(ctx, startCoords);
      const maxIterator = plotPoints.length;
      const scale = 100;

      // generate direction multipliers
      var directions = [[]];
      var x = 100;
      var y = 0;
      var xDec = true;
      var yDec = false;
      for (let i = 0; i <= 100; i++) {
        directions[i] = [x/100, y/100];
        xDec ? x-=4 : x+=4;
        yDec ? y-=4 : y+=4;
        if (x <= -100) {
          xDec = false;
        }
        if (y >= 100) {
          yDec = true;
        }
      }

      var currentDirection = directions[0];
      var pointScale = 1;

      for (let i = 0; i < maxIterator; i+=scale) {
        let x1 = startCoords[0];
        let y1 = startCoords[1];

        // apply direction multiplier to get next point
        // (starting point) + [(dist to next plot point aka scale) * (direction multiplier)]
        let x2 = x1 + (pointScale * currentDirection[0]);
        let y2 = y1 + (pointScale * currentDirection[1]);

        // shift direction based on wheel turn
        let roundedVal = Math.round(plotPoints[i][1]);
        currentDirection = directions[roundedVal];

        // draw line
        ctx.lineTo(x2, y2);

        // update startCoords for next line to be drawn
        startCoords = [x2, y2];
      }
      ctx.stroke();
    } else {
      alert('Error drawing track layout');
    }
  }

  // Handle file upload
  const showFile = async (e) => {
    // open file
    e.preventDefault();
    setFileName(e.target.value);
    const reader = new FileReader();

    reader.onload = async (e) => {
      // read and parse contents
      const text = (e.target.result);
      parseData(text);
    };
    reader.readAsText(e.target.files[0]);
  };

  const useSampleFile = () => {
    fetch("/sampleFile")
      .then((res) => res.json())
      .then((data) => parseData(data.contents));
  }

  const data = [
    ['New Castle', 'New Castle IN', '10'],
    ['K1 Speed', 'Fishers IN', '3'],
    ['Indianapolis Motor Speedway', 'Indianapolis IN', '9'],
  ];
  const columns = ['Race Name', 'Location', 'Position'];

  // Page Layout
  return (
      <main>
        <h1>Upload Race Data</h1>
        {/*<p>TODO:</p>
        <ul>
          <li>Can upload a race data file in each row</li>
          <li>Table data is associated with each user and changes can be saved</li>
          <li>Add/update/delete rows</li>
        </ul>
        <EditableTable data={data} columns={columns} />*/}
        <br/><br/>
        <input type="file" onChange={(e) => showFile(e)} />
        <button onClick={useSampleFile}>Use sample file (Bahrain)</button>
        <p>{fileName}</p>
        <Plot
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
        />
        <Plot
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
        />
        <Plot
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
        />
        <Plot
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
        />
        <h3>Estimated Track Layout</h3>
        <canvas id="trackCanvas" width="500" height="500"/>
      </main>
  );
}
  
export default UploadRaceData;