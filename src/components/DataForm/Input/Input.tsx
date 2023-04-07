import React, {ChangeEvent, memo, useEffect, useState} from "react";
import "./Input.scss"
import config from "../../../data/config.json";
import {ElementEnum, ElementKeys} from "../../../helpers/Enums";
import {ErrorsObj, ParamsObj, TouchedInputs} from "../../../helpers/interfaces";

type InputType = {
    name: string
    setParams: React.Dispatch<React.SetStateAction<ParamsObj>>
    setErrors: React.Dispatch<React.SetStateAction<ErrorsObj>>
    setTouchedInputs: React.Dispatch<React.SetStateAction<TouchedInputs>>
}

export const Input: React.FC<InputType> = memo(({ name, setParams, setErrors, setTouchedInputs }) => {
    const [value, setValue] = useState(0)
    const [error, setError] = useState("")

    const minValue = config.find(el => el.key === name).min
    const maxValue = config.find(el => el.key === name).max

    const onBlurHandler = () => {
        if (value < minValue || value > maxValue) {
            setError(`value should be from ${minValue} till ${maxValue}`)
        }
        if (!error) setParams((prevState) => ({...prevState, [name]: value}))
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value.replace(/[^0-9]/g, "");
        setValue(+newValue)
        setError("")
        setTouchedInputs((prevTouchedInputs) => ({...prevTouchedInputs, [name]: true}));
    }

    useEffect(() => {
        setErrors((prevState) => ({...prevState, [name]: error}))
    }, [error])

    return (
        <div className="input__container">
            <span className="title">Введите {ElementEnum[name as ElementKeys]} конструкции: </span>
            <div className="input__box">
                <input className={error ? "error" : ""} name={name} value={value}
                       onBlur={onBlurHandler} onChange={onChangeHandler}/>
                <span className={error ? "error" : ""}>{error}</span>
            </div>
        </div>
    );
});