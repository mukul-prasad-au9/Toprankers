import React from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import BtnCellRenderer from "./Components/BtnCellRenderer";

const List = (props) => {
  const columnDefs = [
    {
      field: "id",
      sortable: true,

      minWidth: 150,
    },
    {
      field: "Name",
      maxWidth: 90,
    },
    {
      field: "Email",
      minWidth: 150,
    },
    {
      field: "city",
      maxWidth: 90,
    },
    {
      field: "date",
      minWidth: 150,
    },
    {
      field: "country",
      minWidth: 150,
    },
  ];

  const frameworkComponents = {
    btnCellRenderer: BtnCellRenderer,
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400 }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={props.rowData}
        frameworkComponents={frameworkComponents}
      ></AgGridReact>
    </div>
  );
};

export default List;
