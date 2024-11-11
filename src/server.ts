import {App} from './app'
import logger from './utils/logget'

const port = 5050




// const schema = appSchemas.schemas.map((schema) => {
//     return schema
// })

// console.log(schema)
const {app} = new App()
app.listen(port, () => logger.info(`server started on port ${ port }`))