import React, {ChangeEvent, memo, useEffect} from "react";
import "./Select.scss"
import {ElementEnum, ElementKeys} from "../../../helpers/Enums";
import {ParamsObj} from "../../../helpers/interfaces";

type SelectType = {
    data: DataType[]
    name: string
    setParams: React.Dispatch<React.SetStateAction<ParamsObj>>
}

type DataType = {
    type: string
    name: string
}

export const Select: React.FC<SelectType> = memo(({data, name, setParams}) => {
    useEffect(() => {
        const defaultValue = data.find(el => el.type === name).name;
        setParams((prevState) => ({...prevState, [name]: defaultValue}))
    }, []);

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setParams((prevState) => ({...prevState, [name]: e.target.value}))
    }

    return (
        <div className="select__container">
            <label htmlFor="elements">Выберите {ElementEnum[name as ElementKeys]}:</label>
            <select id="elements" name={name} className="selector"
                    onChange={onChangeHandler}>
                {
                    data.map((el, index) =>
                        el.type === name &&
                        <option value={el.name} key={index}>{el.name}</option>
                    )
                }
            </select>
        </div>
    );
});