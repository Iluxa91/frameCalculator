import React, {useState} from "react";
import "./App.scss"
import {DataForm} from "./DataForm/DataForm";
import {Result} from "./Result/Result";

export const App = () => {
    let [area, setArea] = useState(0)
    const getArea = (width: number, length: number) => {
        setArea(width * length)
    }
    return (
        <div className="block">
            <DataForm getArea={getArea}/>
            <Result area={area}/>
        </div>
    );
};