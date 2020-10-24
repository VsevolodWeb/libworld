const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const mongoose = require('mongoose')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const schema = require("./graphql/schema")
const resolver = require("./graphql/resolver")

const app = express()

app.use(bodyParser.json({limit: '3mb', extended: true}))
app.use(express.json({extended: true}))
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

const PORT = config.get('port') || 5000;

(async () => {
	try {
		await mongoose.connect(config.get('mongoURI'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		})

		app.listen(PORT, (error) => {
			if (error) throw error

			console.log(`App has been started on port ${PORT}...`)
		})
	} catch (e) {
		console.log('Server error', e.message)
		process.exit(1)
	}
})()