import EditableTable from "../Components/EditableTable";
import React from "react";
import Plot from 'react-plotly.js';

function UploadRaceData() {
  const [fileContents, setFileContents] = React.useState();
  const [wheelValues, setWheelValues] = React.useState([]);
  const [plotRange, setPlotRange] = React.useState([]);
  const [fileName, setFileName] = React.useState('');

  // Read and parse file contents
  const showFile = async (e) => { 
    e.preventDefault();
    setFileName(e.target.value);
    const reader = new FileReader();
    reader.onload = async (e) => { 
      const text = (e.target.result);
      console.log(text);
      let values = text.split("\",\"Wheel turned to ");
      values = values.slice(1, -1);
      var valuesFloat = values.map(function (value) { 
        return parseFloat(value, 10); 
      });
      console.log(valuesFloat);
      setWheelValues(valuesFloat);
      var rangeArr = values.map(function (value, index) {
        return index;
      });
      setPlotRange(rangeArr);
      console.log(rangeArr);
      setFileContents(values);
        
      // draw race track
      var canvas = document.getElementById('trackCanvas');
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        let plotPoints = [[]];
        console.log(rangeArr.length);
        for (let i = 0; i < rangeArr.length; i++) {
          plotPoints[i] = [rangeArr[i], values[i]];
        }
        console.log(plotPoints);

        let startCoords = [300, 300];

        ctx.beginPath();
        ctx.moveTo.apply(ctx, startCoords);
        const maxIterator = plotPoints.length;

        for (let i = 0; i < maxIterator; i+=10) {
          let x1 = startCoords[0];
          let y1 = startCoords[1];
          let r =  1;
          let theta = (plotPoints[i][1] / 100) * 360;
          let newCoords = [x1 + r * Math.cos(Math.PI * theta / 180.0), y1 + r * Math.sin(Math.PI * theta / 180.0)];
          ctx.moveTo(x1, y1);
          ctx.lineTo(newCoords[0], newCoords[1]);
          ctx.stroke();
          startCoords = newCoords;
        }
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
        <canvas id="trackCanvas" width="1000" height="1000"/>
      </main>
  );
}
  
export default UploadRaceData;


/* 
          switch(plotPoints[i][1]) {
            case 0:
              direction += 4;
              break;
            case 12.5: 
              direction += 3;
              break;
            case 25:
              direction += 2;
              break;
            case 37.5:
              direction++;
              break;
            case 50:
              break;
            case 62.5:
              direction--;
              break;
            case 75: 
              direction -= 2;
              break;
            case 87.5:
              direction -= 3;
              break;
            case 100:
              direction -= 4;
              break;
          }
*/