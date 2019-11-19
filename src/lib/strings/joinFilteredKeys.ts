
export function joinFilteredKeys(obj: { [className: string]: boolean }, token: string = " ") {
    return Object.keys(obj).filter((key) => obj[key]).join(token)
}
