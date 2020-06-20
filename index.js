const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const cors = require('cors')
const schema = require("./graphql/schema")
const resolver = require("./graphql/resolver")

const app = express()

app.use(express.json({ extended: true }))
app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolver,
  graphiql: true,
}))

const PORT = config.get('port') || 5000;

(async() => {
	try {
		await mongoose.connect(config.get('mongoURI'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: true
		});

		app.listen(PORT, (error) => {
			if (error) throw error

			console.log(`App has been started on port ${PORT}...`)
		});
	} catch (e) {
		console.log('Server error', e.message)
		process.exit(1)
	}
})()