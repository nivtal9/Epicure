export enum Sides {
    Fries = 0,
    Rice = 1,
    Beans = 2,
    Mashed_Potato = 3
}

export enum Changes {
    Without_Peanuts = 0,
    Gluten_Free_Bun = 1,
    Less_Spicy = 2,
    No_Pickles = 3
}

export enum MealType {
    BREAKFAST = 0,
    LUNCH = 1,
    DINNER = 2
}

export interface DishIcon {
    id: number
    iconURI: string,
}

export interface MealTypes {
    enum: number
}

export interface Change {
    enum: number
}

export interface Side {
    enum: number
}

