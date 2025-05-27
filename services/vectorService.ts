export type Vec = { x: number; y: number };

export function normalize(v: Vec) {
    const m = Math.hypot(v.x, v.y) || 1;
    return { x: v.x / m, y: v.y / m };
}

export function mult(v: Vec, s: number) {
    return { x: v.x * s, y: v.y * s };
}

export function add(a: Vec, b: Vec) {
    return { x: a.x + b.x, y: a.y + b.y };
}

export function sub(a: Vec, b: Vec) {
    return { x: a.x - b.x, y: a.y - b.y };
}

export function dist2(a: Vec, b: Vec) {
    return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
}

export function limit(v: Vec, max: number) {
    const m = Math.hypot(v.x, v.y);
    return m > max ? { x: (v.x / m) * max, y: (v.y / m) * max } : v;
}