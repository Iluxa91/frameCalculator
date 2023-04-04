import React from "react";

type ResultType = {
    area: number
}

export const Result: React.FC<ResultType> = ({area}) => {
    return (
        <div>
            {area}m2
        </div>
    );
};