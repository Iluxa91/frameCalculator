import React, {ChangeEvent, useState} from "react";
import "./Input.scss"

type InputType = {
    max: number
    min: number
    property: string
    getValue: (value: number) => void
}

export const Input: React.FC<InputType> = ({min, max, property, getValue}) => {
    let [value, setValue] = useState(0)
    let [error, setError] = useState("")

    const onBlurHandler = () => {
        if (value <= min || value >= max) {
            setError(`value should be from ${min} till ${max}`)
        }
        if(!error) getValue(value)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(+e.currentTarget.value)
        setError("")
    }

    return (
        <div className="block">
            <span className="title">input element {property}: </span>
            <div>
                <input value={value}
                       onBlur={onBlurHandler} onChange={onChangeHandler}/>
                <span className={error ? "error" : ""}>{error}</span>
            </div>
        </div>
    );
};