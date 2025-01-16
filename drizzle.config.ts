import { defineConfig } from "drizzle-kit"

export default defineConfig({
    dialect: "postgresql",
    schema: './src/schemas/index.ts',
    out: './drizzle',
    dbCredentials: {
        url: 'postgresql://investment_epev_user:VvYMCzxcVF7vEVwV3udUwp0ULgYf13MF@dpg-cu4n1bqj1k6c738pscc0-a/investment_epev'
    }

})
