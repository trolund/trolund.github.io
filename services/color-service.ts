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

export function getCssColor(cssVarName: string, alpha: number): string {
    return getColorWithAlpha(getHexColor(cssVarName), alpha);
}