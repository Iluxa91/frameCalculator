import React, {useState} from "react";
import "./DataForm.scss"
import data from "../../data/data.json"
import config from "../../data/config.json"
import {Input} from "./Input/Input";
import {Select} from "./Select/Select";
import {Result} from "./Result/Result";
import {ErrorsObj, TouchedInputs} from "../../helpers/interfaces";

export const DataForm = () => {
    const [showResult, setShowResult] = useState(false)
    const [errors, setErrors] = useState<ErrorsObj>({} as ErrorsObj)
    const [touchedInputs, setTouchedInputs] = useState<TouchedInputs>({
        width: false,
        length: false,
    });
    const [params, setParams] = useState({
        width: 0,
        length: 0,
    })

    const onClickHandler = () => {
        setShowResult(true)
    }

    const isDisabled = Boolean(errors.width || errors.length) || !touchedInputs.width || !touchedInputs.length

    return (
        <div className="data__block">
            <div className="input__block">
                <h1>Вводные данные</h1>
                <Select name="list" data={data} setParams={setParams}/>
                <Select name="pipe" data={data} setParams={setParams}/>
                <Input name="width"
                       setParams={setParams}
                       setErrors={setErrors}
                       setTouchedInputs={setTouchedInputs}/>
                <Input name="length"
                       setParams={setParams}
                       setErrors={setErrors}
                       setTouchedInputs={setTouchedInputs}/>
                <Select name="frame" data={config} setParams={setParams}/>
                <div className="button__container">
                    <button disabled={isDisabled} onClick={onClickHandler}>Рассчитать
                    </button>
                </div>
            </div>
            {showResult && <Result params={params} isDisabled={isDisabled}/>}
        </div>
    );
};