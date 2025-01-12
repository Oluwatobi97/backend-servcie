import { defineConfig } from "drizzle-kit"

export default defineConfig({
    dialect: "postgresql",
    schema: './src/schemas/index.ts',
    out: './drizzle',
    dbCredentials: {
        url: 'postgresql://kayode:xbQqndwd9nO1R8T9skcBAP5JTxyHYHog@dpg-cu23b71u0jms738nfnt0-a/investment_app_xxjq'
    }

})