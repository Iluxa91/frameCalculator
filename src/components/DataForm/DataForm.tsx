import React, {ChangeEvent, useState} from "react";
import "./DataForm.scss"
import data from "../../data/data.json"
import config from "../../data/config.json"
import {Input} from "./Input/Input";
import {Select} from "./Select/Select";

type DataType = {
    type: string,
    name: string,
    material: string,
    unit: string,
    width: number,
    price: number
}

type DataFormType = {
    getArea: (width: number, length: number) => void
}

export const DataForm: React.FC<DataFormType> = ({getArea}) => {
    const widthMin = config.find(el => el.key === "width").min
    const widthMax = config.find(el => el.key === "width").max
    const lengthMin = config.find(el => el.key === "length").min
    const lengthMax = config.find(el => el.key === "length").max

    // let [width, setWidth] = useState(0)
    // let [length, setLength] = useState(0)

    let width = 0
    let length = 0
    const getWidth = (value: number) => width = value
    const getLength = (value: number) => length = value

    const onClickHandler = () => {
        getArea(width, length)
    }

    return (
        <div className="data_block">
            <h1>Вводные данные</h1>

            <Select materialType="list" data={data}/>
            <Select materialType="pipe" data={data}/>
            <Input max={widthMax} min={widthMin} property="width"
                   getValue={getWidth}/>
            <Input max={lengthMax} min={lengthMin} property={"length"}
                   getValue={getLength}/>
            <Select materialType="frame" data={config}/>


            <button onClick={onClickHandler}>Рассчитать</button>
        </div>
    );
};