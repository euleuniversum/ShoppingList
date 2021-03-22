import { IFormValues, IUnitConformity } from "./interface";

export enum Unit {
    PIECE = 'шт',
    CENTIMETER = 'см',
    METER = 'м',
    MILLILITER = 'мл',
    LITER = 'л',
    GRAM = 'г',
    KILOGRAM = 'кг',
    ALL = 'за все'
}

const conformity = new Map<Unit, IUnitConformity[]>([
    [Unit.KILOGRAM,
        [{name: Unit.GRAM, ratio: 1000}]
    ],
    [Unit.METER,
        [{name: Unit.CENTIMETER, ratio: 100}]
    ],
    [Unit.LITER,
        [{name: Unit.MILLILITER, ratio: 1000}]
    ],
    [Unit.GRAM,
        [{name: Unit.KILOGRAM, ratio: 1/1000}]
    ],
    [Unit.CENTIMETER,
        [{name: Unit.METER, ratio: 1/100}]
    ],
    [Unit.MILLILITER,
        [{name: Unit.LITER, ratio: 1/1000}]
    ]
]);

function getConformity(unit: Unit): Unit[] {
    if (conformity.has(unit)) {
        return conformity.get(unit)?.map(item => item.name) || [];
    }

    return [];
}

export const getPriceUnit = (quantityUnit: Unit) => {
    const units = getConformity(quantityUnit);
    let priceUnit = [Unit.ALL, quantityUnit];
    return priceUnit.concat(units);
}

export const QuantityUnit: Unit[] = [
    Unit.PIECE,
    Unit.KILOGRAM,
    Unit.METER,
    Unit.LITER,
    Unit.GRAM,
    Unit.CENTIMETER,
    Unit.MILLILITER,
];

export const convertUnits = (from: Unit, to: Unit, quantity: number = 1) => {
    if (from === to) {
        return quantity;

    } else if (to === Unit.ALL) {
        if (quantity === 0) {
            return 0;
        }

        return 1;

    } else if (conformity.has(from)) {
        const ratio = conformity.get(from)?.find(item => item.name === to)?.ratio;
        if (ratio) {
            return quantity * ratio;
        }
    }

    return quantity;
}

export const getTotalPriceElement = (purchase: IFormValues) => {
    const {quantityUnit, priceUnit} = purchase;
    const price = purchase.price || 0;
    const quantity = purchase.quantity || 1;

    return convertUnits(quantityUnit, priceUnit, quantity) * price;
}