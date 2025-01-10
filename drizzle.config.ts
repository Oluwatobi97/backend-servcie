import { defineConfig } from "drizzle-kit"

export default defineConfig({
    dialect: "postgresql",
    schema: './src/schemas/index.ts',
    out: './drizzle',
    dbCredentials: {
        url: 'postgresql://kayode:mUTCPeinys3Bd5CNpiB1WzcqG9nqQgYw@dpg-cu0fq65ds78s73dd7di0-a/investment_app_2lk2'
    }

})