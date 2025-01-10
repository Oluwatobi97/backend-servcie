import { defineConfig } from "drizzle-kit"

export default defineConfig({
    dialect: "postgresql",
    schema: './src/schemas/index.ts',
    out: './drizzle',
    dbCredentials: {
        url: 'postgresql://investment_5529_user:FZk0vtlfgGd6aJb5uhLEwqaH7LnTLPD1@dpg-cu0gna1u0jms73d18lfg-a/investment_5529'
    }

})