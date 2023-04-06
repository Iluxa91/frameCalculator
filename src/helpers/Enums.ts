export enum ParamEnum {
    UNIT = "unit",
    PRICE = "price",
    WIDTH = "width",
    MATERIAL = "material",

}

export enum ElementEnum {
    list = "лист покрытия",
    pipe = "трубу",
    frame = "прочность рамы",
    fix = "Саморез",
    width = "ширину",
    length = "длину"
}

export type ElementKeys = keyof typeof ElementEnum