import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: "http://localhost:8080/graphql",
    documents: "src/**/*.{gql,graphql}",
    emitLegacyCommonJSImports: false,
    ignoreNoDocuments: true,
    generates: {
        "./src/graphql/generated/schema.ts": {
            plugins: [
                "typescript",
                "typescript-operations",
                "typescript-react-apollo",
            ],
        },
        "./src/graphql/generated/schema.json": {
            plugins: ["introspection"],
        },
    },
};

export default config;
