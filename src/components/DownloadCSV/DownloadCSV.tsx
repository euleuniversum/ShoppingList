import {CSVLink} from "react-csv";
import React from "react";
import {IDownloadCSVProps} from "../../interface";

export const DownloadCSV = ({headers, data, text, filename} : IDownloadCSVProps) => {
    return (
        <>
            <CSVLink data={data} headers={headers} filename={filename}>{text}</CSVLink>
        </>
    );
}
