
export function randomChoice<T>(array: T[]): T {
    return array[randInt(0, array.length - 1)];
}

export function randInt(lower: number, upper: number): number {
    return lower + Math.floor((upper - lower + 1) * Math.random());
}
