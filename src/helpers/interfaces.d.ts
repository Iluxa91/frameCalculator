export interface DataType {
    type: string,
    name: string,
    unit: string,
    price: number,
    material?: string,
    width?: number,
}

export interface ConfigType {
    type: string,
    key: string,
    name: string,
    min?: number,
    max?: number,
    step?: number,
    value?: number
}

export interface TouchedInputs {
    [key: string]: boolean;
}

export interface TableObj {
    name: string
    unit: string
    totalAmount: number
    totalElPrice: number
}

export interface ErrorsObj {
    width: string
    length: string
}

export interface ParamsObj {
    list: string
    pipe: string
    width: number
    length: number
    frame: string
}



