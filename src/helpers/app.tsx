export type CalcCenteredGridType = {
    span: number;
    offset: number;
};

/**
 * Вычисляет значения 'span' и 'offset' для блока, который нужно разместить посередине строки грида.
 * @param {number} sizeBlock - количество колонок, которое должен занимать блок.
 */
export const calcCenteredGrid = (sizeBlock: number): CalcCenteredGridType => {
    if (sizeBlock % 2 !== 0) {
        throw new Error('значение размера блока должно быть кратно двум');
    }
    const gridColumns = 24; // Количество колонок в системе grid (https://ant.design/components/grid/)
    return {
        span: sizeBlock,
        offset: (gridColumns - sizeBlock) / 2,
    }
};

/**
 * Удаляет пустые и повторяющиеся элементы массива.
 * @param array - исходный массив.
 */
export function clearArray<T>(array: (T | undefined)[]): T[] {
    return Array.from(new Set(
        array.filter(item => item !== undefined)
    )) as T[];
}