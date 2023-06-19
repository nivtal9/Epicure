import { IDishes } from "./IDishes";

export interface IOrder {
    restName: string,
    dishes: IDishes[],
    totalSum: number
    comment: string
}