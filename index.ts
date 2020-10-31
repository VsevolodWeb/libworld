import express from 'express'
import bodyParser from 'body-parser'
import config from 'config'
import mongoose from 'mongoose'
import graphqlHTTP from 'express-graphql'
import cors from 'cors'
import schema from "./graphql/schema"
import resolver from "./graphql/resolver"

const app = express()

app.use(bodyParser.json({limit: '3mb'}))
app.use(cors())
app.use(express.static('public'))

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		rootValue: resolver,
		graphiql: true,
	})
)

const PORT = config.get<number>('port') || 5000;

(async () => {
	try {
		await mongoose.connect(config.get('mongoURI'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		})

		app.listen(PORT, () => {
			console.log(`App has been started on port ${PORT}...`)
		})
	} catch (e) {
		console.log('Server error', e.message)
		process.exit(1)
	}
})()