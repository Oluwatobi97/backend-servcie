import { defineConfig } from "drizzle-kit"

export default defineConfig({
    dialect: "postgresql",
    schema: './src/schemas/index.ts',
    out: './drizzle',
    dbCredentials: {
        url: 'postgresql://tobi:NGgTeFxG3WiHmLAh44yVMPYPYq502MzY@dpg-cstkfhogph6c739frsng-a/invetment'
    }

})