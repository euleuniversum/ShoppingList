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

const conformity = new Map([
    [Unit.KILOGRAM, Unit.GRAM],
    [Unit.METER, Unit.CENTIMETER],
    [Unit.LITER, Unit.MILLILITER],
    [Unit.GRAM, Unit.KILOGRAM],
    [Unit.CENTIMETER, Unit.METER],
    [Unit.MILLILITER, Unit.LITER]
]);


function getConformity(unit: Unit) {
    return conformity.has(unit) ? conformity.get(unit) : undefined;
}

export const getPriceUnit = (quantityUnit: Unit) => {
    const unit = getConformity(quantityUnit);
    let priceUnit = [Unit.ALL, quantityUnit]
    if (unit) priceUnit.push(unit);
    return priceUnit;
}

export const QuantityUnit: Unit[] = [
    Unit.PIECE,
    Unit.KILOGRAM,
    Unit.METER,
    Unit.LITER,
    Unit.GRAM,
    Unit.CENTIMETER,
    Unit.MILLILITER,
]