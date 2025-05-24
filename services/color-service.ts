export function getHexColor(cssVarName: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(cssVarName).trim();
}

export function getRgbColor(hex: string): { r: number; g: number; b: number } {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

export function getColorWithAlpha(hex: string, alpha: number): string {
    const { r, g, b } = getRgbColor(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// get getColorWithAlpha but slightly different cores based on x and y position
export function getColorWithAlphaBasedOnPosition(hex: string, alpha: number, x: number, y: number): string {
    const { r, g, b } = getRgbColor(hex);
    const adjustedR = Math.min(255, Math.max(0, r + (x % 50) - 25));
    const adjustedG = Math.min(255, Math.max(0, g + (y % 50) - 25));
    const adjustedB = Math.min(255, Math.max(0, b + (x % 50) - 25));
    return `rgba(${adjustedR}, ${adjustedG}, ${adjustedB}, ${alpha})`;
}

// get getCssColor but using getColorWithAlphaBasedOnPosition
export function getCssColorBasedOnPosition(cssVarName: string, alpha: number, x: number, y: number): string {
    return getColorWithAlphaBasedOnPosition(getHexColor(cssVarName), alpha, x, y);
}

export function getCssColor(cssVarName: string, alpha: number): string {
    return getColorWithAlpha(getHexColor(cssVarName), alpha);
}
