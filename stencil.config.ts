import { Config } from "@stencil/core"
import { inlineSvg } from "stencil-inline-svg"

export const config: Config = {
    namespace: "oui",
    taskQueue: "async",
    globalStyle: "src/global/variables.css",
    outputTargets: [
        {
            type: "dist",
            esmLoaderPath: "../loader",
        },
        {
            type: "docs-readme",
        },
        {
            type: "www",
            serviceWorker: null, // disable service workers
        },
    ],
    plugins: [inlineSvg()],
}
