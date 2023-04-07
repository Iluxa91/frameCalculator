import React, {ChangeEvent, memo, useEffect, useState} from "react";
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
    material?: string
    price?: number
    width?: number
}

export const Select: React.FC<SelectType> = memo(({data, name, setParams}) => {
    const [sortOrder, setSortOrder] = useState("asc");
    const [filteredMaterials, setFilteredMaterials] = useState(data);

    useEffect(() => {
        const defaultValue = data.find(el => el.type === name).name;
        setParams((prevState) => ({...prevState, [name]: defaultValue}))

        const defaultSortedMaterials = filteredMaterials.filter(el =>
            el.type === name).sort((a, b) => a.price - b.price)
        setFilteredMaterials(defaultSortedMaterials)
    }, []);

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setParams((prevState) => ({...prevState, [name]: e.target.value}))
    }

    const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
        const order = e.currentTarget.value;
        const sortedMaterials = filteredMaterials.sort((a, b) => {
            switch (order) {
                case "asc":
                    return a.price - b.price
                case "desc":
                    return b.price - a.price
                case "w-desc":
                    return a.width - b.width
                default:
                    break
            }
        });
        setFilteredMaterials(sortedMaterials);
        setSortOrder(order);
    };

    const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
        const filter = e.currentTarget.value;
        const filteredMaterials = data.filter(el =>
            el.type === "list" &&
            el.material?.includes(filter.toLowerCase())
        );
        setFilteredMaterials(filteredMaterials);
    };

    return (
        <div className="select__container">
            <div className="label__container">
                <label
                    htmlFor="elements">Выберите {ElementEnum[name as ElementKeys]}:</label>
                {
                    name === "list" && <div className="filter__container">
                        <label htmlFor="filter">материал:</label>
                        <input id="filter" type="text" onChange={handleFilter}/>
                    </div>
                }
            </div>
            <div className="selector__box">
                {
                    name === "list" &&
                    <select id="sort-order" value={sortOrder} onChange={handleSort}>
                        <option value="asc">Цена: по возрастанию</option>
                        <option value="desc">Цена: по убыванию</option>
                        <option value="w-desc">Ширина: по возрастанию</option>
                    </select>
                }
                <select id="elements" name={name} className="selector"
                        onChange={onChangeHandler}>
                    {
                        filteredMaterials.map((el, index) =>
                            el.type === name &&
                            <option value={el.name} key={index}>{el.name}</option>
                        )
                    }
                </select>
            </div>
        </div>
    );
});