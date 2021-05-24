import React, { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import axios from "axios";
import Delete from "./Components/BtnCellRenderer";
import Save from "./Components/Save";
import List from "./List";
import DropDownCountry from "./Components/DropDownCountry";
import DropDownCities from "./Components/DropDownCities";
import Date from "./Components/Date";

const App = () => {
  useEffect(() => {
    axios.get("http://localhost:3000/rows").then((res) => setRowData(res.data));
  }, []);
  const [rowData, setRowData] = useState("");
  const [gridApi, setGridApi] = useState("");
  const [columnApi, setColumnApi] = useState("");
  const [render, setRender] = useState(false);

  const gridRef = useRef(null);
  const onButtonClick = (e) => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    if (selectedNodes == undefined) {
      return;
    } else if (selectedNodes.length == 1) {
      console.log(selectedNodes[0].data, selectedNodes, "node");
    } else {
      for (var i = 0; i < selectedNodes.length; i++) {
        console.log(selectedNodes[i].data);
      }
    }
  };
  const columnDefs = [
    {
      field: "id",
      sortable: true,
      editable: true,
      minWidth: 150,
      cellRenderer: "agGroupCellRenderer",
      cellRendererParams: {
        checkbox: true,
      },
    },
    {
      field: "Name",
      maxWidth: 90,
      editable: true,
    },
    {
      field: "Email",
      minWidth: 150,
      editable: true,
    },

    {
      field: "date",
      minWidth: 150,
      editable: true,
      cellRenderer: "date",
    },
    {
      field: "country",
      minWidth: 50,
      editable: true,
      cellRenderer: "dropdowncountry",
    },
    {
      field: "city",
      maxWidth: 200,
      editable: true,
      cellRenderer: "dropdowncity",
    },
    {
      field: "",
      cellRenderer: "save",
      cellRendererParams: {
        clicked: function (field) {
          var include = false;
          for (var i = 0; i < rowData.length; i++) {
            if (rowData[i].id == field) {
              include = true;
            }
          }
          if (include === false) {
            saveData();
          } else {
            EditData();
          }
        },
      },
    },
    {
      field: "",
      cellRenderer: "delete",
      cellRendererParams: {
        clicked: function (field) {
          axios
            .delete(`http://localhost:3000/rows/${field}`)
            .then((res) => console.log(res, "done"));
        },
      },
    },
  ];
  const AddRow = () => {
    gridApi.applyTransaction({ add: [{ id: "", Name: "" }] });
  };
  const frameworkComponents = {
    delete: Delete,
    save: Save,
    dropdowncountry: DropDownCountry,
    dropdowncity: DropDownCities,
    date: Date,
  };
  const onGridReady = (params) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
  };

  const saveData = (e) => {
    const selectedNodes = gridRef.current.api.getRowNode();
    axios
      .post("http://localhost:3000/rows", {
        id: selectedNodes[0].id,
        Name: selectedNodes[0].Name,
        Date: selectedNodes[0].Date,
        country: selectedNodes[0].country,
        city: selectedNodes[0].city,
        gender: selectedNodes[0].gender,
      })
      .then((res) => console.log("post done"));
  };
  const EditData = (e) => {
    const selectedNodes = gridRef.current.api.getRowNode();
    axios
      .patch("http://localhost:3000/rows", {
        id: selectedNodes[0].id,
        Name: selectedNodes[0].Name,
        Date: selectedNodes[0].Date,
        country: selectedNodes[0].country,
        city: selectedNodes[0].city,
        gender: selectedNodes[0].gender,
      })
      .then(() => console.log("edit done"));
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400 }}>
      <button onClick={AddRow}>Add</button>
      <button onClick={onButtonClick}>Get selected rows</button>
      <button
        onClick={() => {
          if (true) {
            setRender(false);
            setRender(true);
          }
          setRender(true);
        }}
      >
        Submit
      </button>

      <AgGridReact
        ref={gridRef}
        rowSelection="multiple"
        onGridReady={onGridReady}
        columnDefs={columnDefs}
        rowData={rowData}
        frameworkComponents={frameworkComponents}
      ></AgGridReact>
      <button onClick={() => gridRef.current.api.deselectAll()}>
        Clear Selection
      </button>
      <button onClick={() => gridRef.current.api.selectAll()}>
        Select All
      </button>
      <h1>Submitted Data</h1>
      {render ? <List rowData={rowData} /> : <List rowData={[]} />}
    </div>
  );
};

export default App;
