import React, {memo, useState} from "react";
import "./Result.scss"
import data from "../../../data/data.json"
import config from "../../../data/config.json"
import {CalculationTable} from "./CalculationTable";
import {ElementEnum, ParamEnum} from "../../../helpers/Enums";
import {DataType, TableObj} from "../../../helpers/interfaces";

type ResultType = {
    params: any
    isDisabled: boolean
}

export const Result: React.FC<ResultType> = memo(({params, isDisabled}) => {

    let [showCalculation, setShowCalculation] = useState(false)
    let [calculation, setCalculation] = useState([])
    let [frameNumb, setFrameNumb] = useState(1)

    // frame params
    const frameLength = params.length
    const frameWidth = params.width
    const frameArea = frameLength * frameWidth

    // get element parameters functions
    const getElParam = (name: string, param: ParamEnum): any => data.find(el => el.name === name)[param as keyof DataType]
    const getElStep = (name: string) => config.find(el => el.name === name).step
    const getTotalElPrice = (name: string, amount: number) => Math.ceil(getElParam(name, ParamEnum.PRICE) * amount)

    const tableArray = [] as TableObj[]
    const addToTable = (name: string, amount: number) => {
        tableArray.push({
            name,
            unit: getElParam(name, ParamEnum.UNIT),
            totalAmount: amount,
            totalElPrice: getTotalElPrice(name, amount)
        })
    }

    // list count
    const listLength = 1
    const listArea = listLength * getElParam(params.list, ParamEnum.WIDTH)
    const listsAmount = Math.ceil(frameArea / listArea)
    const listsTotalAmount = (listsAmount * listArea).toFixed(2)

    addToTable(params.list, +listsTotalAmount)

    // pipe count
    const pipeWidth = getElParam(params.pipe, ParamEnum.WIDTH) / 1000
    const maxPipeStep = getElStep(params.frame)
    const maxPipeStepForWidth = maxPipeStep <= listLength ? maxPipeStep : listLength
    const pipeAmountByLength = Math.ceil(frameLength / (maxPipeStep + pipeWidth) + 1)
    const pipeAmountByWidth = Math.ceil(frameWidth / (maxPipeStepForWidth + pipeWidth) + 1)
    const pipeLength = pipeAmountByLength * params.width + pipeAmountByWidth * params.length

    addToTable(params.pipe, pipeLength)

    // cell size
    const cellWidth = (params.width / (pipeAmountByWidth - 1)).toFixed(2)
    const cellLength = (params.length / (pipeAmountByLength - 1)).toFixed(2)

    // fix amount
    const listMaterial = getElParam(params.list, ParamEnum.MATERIAL)
    const fixAmountPerMeter = config.find(el => el.key === listMaterial && el.type === "fix").value
    const fixAmount = fixAmountPerMeter * frameArea

    addToTable(ElementEnum.fix, fixAmount)

    const totalPrice = tableArray.reduce((acc, el) => acc + el.totalElPrice, 0)

    // basket of production calculation
    const frameTable: JSX.Element[] = tableArray.map((el, i) =>
        <tr key={i}>
            <td>{el.name}</td>
            <td>{el.unit}</td>
            <td>{el.totalAmount}</td>
            <td>{el.totalElPrice}</td>
        </tr>
    )

    const onCLickHandler = () => {
        const frameCalculation: JSX.Element = (
            <tbody>
            <tr>
                <td colSpan={4}>Изделие № {frameNumb}</td>
            </tr>
            {frameTable}
            </tbody>)

        setFrameNumb(frameNumb + 1)
        setCalculation([...calculation, frameCalculation])
        setShowCalculation(true)
    }

    return (
        <div className="result_block">
            <div>
                <h1>Результат</h1>
                <h4>Площадь изделия: {frameArea}м2</h4>
                <h4>Расчетный размер ячейки: (Wc x Lc) {cellWidth}м x {cellLength}м</h4>
                <h4>Количество листов: {listsAmount}</h4>
                <table>
                    <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>ед.</th>
                        <th>кол-во</th>
                        <th>сумма</th>
                    </tr>
                    </thead>
                    <tbody>
                    {frameTable}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan={3}>Итого</td>
                        <td>{totalPrice}</td>
                    </tr>
                    </tfoot>
                </table>
                <button disabled={isDisabled} onClick={onCLickHandler}>добавить в
                    корзину
                </button>
            </div>
            <div>
                {showCalculation && <CalculationTable calculation={calculation}/>}
            </div>
        </div>
    );
});