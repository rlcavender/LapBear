import EditableTable from "../Components/EditableTable";
import React from "react";
import Plot from 'react-plotly.js';

function UploadRaceData() {
  const [wheelValues, setWheelValues] = React.useState([]);
  const [plotRange, setPlotRange] = React.useState();
  const [fileName, setFileName] = React.useState('');

  // Handle file upload
  const showFile = async (e) => {
    // open file
    e.preventDefault();
    setFileName(e.target.value);
    const reader = new FileReader();

    reader.onload = async (e) => {
      // read and parse contents
      const text = (e.target.result);

      var values = text.split("\",\"Wheel turned to ");
      values = values.slice(1, -1);
      var valuesFloat = values.map(function (value) { 
        return parseFloat(value, 10); 
      });

      setWheelValues(valuesFloat);
      setPlotRange(valuesFloat.length);
        
      // draw race track approximation
      var canvas = document.getElementById('trackCanvas');
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        // for each wheel value, create an [x, y] coordinate pair
        var startCoords = [340, 140];
        var plotPoints = [[]];
        for (let i = 0; i < values.length; i++) {
          plotPoints[i] = [i, values[i]];
        }
        console.log(plotPoints);

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
        console.log(directions);

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
    };
    reader.readAsText(e.target.files[0]);
  };

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
        <p>TODO:</p>
        <ul>
          <li>Can upload a race data file in each row</li>
          <li>Table data is associated with each user and changes can be saved</li>
          <li>Add/update/delete rows</li>
        </ul>
        <EditableTable data={data} columns={columns} />
        <br/><br/>
        <input type="file" onChange={(e) => showFile(e)} />
        <p>{fileName}</p>
        <p>TODO:</p>
        <ul>
          <li>Throttle/brake analysis</li>
          <li>Shifting / current gear analysis</li>
          <li>Save plots in user's info so this doesn't have to be re-calculated every time the page loads</li>
        </ul>
        <Plot
          data={[
            {
              x: plotRange,
              y: wheelValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            },
          ]}
          layout={ {width: 500, height: 500, title: 'Wheel Value Throughout Race'} }
        />
        <h3>Estimated Track Layout</h3>
        <p>TODO:</p>
        <ul>
          <li>Fix track estimation algorithm</li>
          <li>Factor in throttle/break values</li>
        </ul>
        <canvas id="trackCanvas" width="350" height="150"/>
      </main>
  );
}
  
export default UploadRaceData;

/*
        var directions = [
          [1, 0],   // 1      0
          [1, 1],   // 0.5    0.5
          [0, 1],   // 0      1 
          [-1, 1],  // -0.5   0.5
          [-1, 0],  // -1     0
          [-1, -1], // -0.5   -0.5
          [0, -1],  // 0      -1
          [1, -1]   // 0.5    -0.5
          [1, 0]    // 1      0
        ]
        */