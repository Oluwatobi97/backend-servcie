import express from 'express'

export const app = express()


const port = process.env.PORT || 5051




// const schema = appSchemas.schemas.map((schema) => {
//     return schema
// })

// console.log(schema)
// const { app } = new App()
app.listen(port, () => console.log('hello'))