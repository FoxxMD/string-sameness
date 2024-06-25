/** @type { import('typedoc').TypeDocOptionMap } */
module.exports = {
    name: "string-sameness Docs",
    entryPoints: [
        "./src",
        "./src/matchingStrategies/index.ts",
        "./src/normalization/index.ts"
    ],
    sort: ["source-order"],
    categorizeByGroup: false,
    searchGroupBoosts: {
        "Functions": 1.5
    },
    navigationLinks: {
        "Docs": "http://foxxmd.github.io/string-sameness",
        "GitHub": "https://github.com/foxxmd/string-sameness"
    },
    plausibleSiteDomain: process.env.ANALYTICS ?? '',
    plausibleSiteOrigin: process.env.ANALYTICS_DOMAIN ?? '',
}
