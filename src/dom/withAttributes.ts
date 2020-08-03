export function withAttributes<T extends NamedNodeMap>(el: { attributes: NamedNodeMap }) {
    return Object.values(<T>el.attributes).reduce((acc: any, attr: Attr): T => {
        acc[attr.name] = attr.value
        return acc
    }, {})
}
