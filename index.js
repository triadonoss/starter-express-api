const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500
const cors = require('cors')

const configuration = new Configuration({
    organization: "org-Mlt1HHrtFYtlPXokEqrcVPAi",
    apiKey: process.env.OPEN_AI_KEY
});
const openai = new OpenAIApi(configuration);


app.use(cors({
    origin: (origin, callback) => {
        if (true) {
            callback(null, true)
        }
    },
    optionsSuccessStatus: 200
}))
app.use(express.json())
app.post('/', async (req,res)=>{
    const {promps} = req.body

    const response = await openai.createCompletion({
        'model': "text-davinci-003",
        'prompt': promps,
        'max_tokens': 100,
        'temperature': 0
    }) 

    res.send(response.data?.choices)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));