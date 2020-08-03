import { readdirSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import camelCase from "lodash.camelcase"

const __dirname = dirname(fileURLToPath(import.meta.url))
const assetDir = __dirname + "/../assets/svg"
const outputDir = __dirname + "/../src/assets/svg"
const files = readdirSync(assetDir).filter((name) => name.match(/^.*\.svg$/))

const process = (svgString) => {
    return svgString.replace(/fill:(.*?);/, "fill: currentColor;")
}

const names = files.map((file) => {
    mkdirSync(outputDir, { recursive: true })
    writeFileSync(
        join(outputDir, file),
        process(readFileSync(join(assetDir, file)).toString())
    )
    return file.match(/([\w-].*?)\.svg$/)[1]
})

const namedExports = names
    .map((name) => {
        return `export { default as ${camelCase(name)} } from "./${name}.svg"`
    })
    .join("\n")

writeFileSync(join(outputDir, "index.ts"), namedExports)

export {}
