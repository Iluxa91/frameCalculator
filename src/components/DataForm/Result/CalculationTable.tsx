import React from "react";

type TableType = {
    calculation: JSX.Element[]
}

export const CalculationTable: React.FC<TableType> = ({calculation}) => {

    const totalCalculationPrice = calculation.reduce((acc, el) => {
        const rows = React.Children.toArray(el.props.children).filter(
            (child: React.ReactElement) => child.type === "tr" && child.props.children.length > 2
        );
        const totalElPriceArray = rows.map(
            (row: React.ReactElement) => parseFloat(row.props.children[3].props.children)
        );
        const subTotal = totalElPriceArray.reduce((a, c) => a + c, 0);
        return acc + subTotal;
    }, 0)

    return (
        <div>
            <h1>Корзина изделий</h1>
            <table>
                <thead>
                <tr>
                    <th>Наименование</th>
                    <th>ед.</th>
                    <th>кол-во</th>
                    <th>сумма</th>
                </tr>
                </thead>
                {...calculation}
                <tfoot>
                <tr>
                    <td colSpan={3}>Итого</td>
                    <td>{totalCalculationPrice}</td>
                </tr>
                </tfoot>
            </table>
        </div>
    );
};