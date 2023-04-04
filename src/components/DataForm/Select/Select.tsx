import React from "react";

type SelectType = {
    materialType: string
    data: DataType[]
}

type DataType = {
    type: string
    name: string
}

export const Select: React.FC<SelectType> = ({materialType, data}) => {
    return (
        <div>
            <label htmlFor="lists">Choose a {materialType}:</label>
            <select name="lists" className="lists-select">
                <option value="">--Please choose a {materialType}--</option>
                {
                    data.map((el, index) =>
                        el.type === materialType &&
                        <option value={el.name} key={index}>{el.name}</option>
                    )}
            </select>
        </div>
    );
};