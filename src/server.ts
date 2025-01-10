
import { app } from './app'
import logger from './utils/logget'


const port = process.env.PORT || 5051

app.listen(port, () => logger.info(`server started on port ${ port }`))