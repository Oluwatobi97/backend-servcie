const express = require('express')

import logger from './utils/logget'
export const app = express()


const port = process.env.PORT || 5051




// const schema = appSchemas.schemas.map((schema) => {
//     return schema
// })

// console.log(schema)
// const { app } = new App()
app.listen(port, () => logger.info(`server started on port ${ port }`))