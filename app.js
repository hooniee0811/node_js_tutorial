const http = require('http')

const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())
app.use('/static', express.static('public'))

app.listen(port, () => console.log(`Server up and running on port ${port}.`))

const db = require("./models")
const GoogleForm = db.GoogleForm
const FormQuestionOption = db.FormQuestionOption

app.get("/", async (req, res) => {
    console.log('---')
    const googleForm = await GoogleForm.findOne({})
    res.json({ message: "Welcome to our application.", googleForm: googleForm })
})

app.get("/formquestionoption/create", async (req, res) => {

    const question = await FormQuestionOption.create({
        formQuestionId: 1,
        title: "option1",
        desc: "option1 desc"
    })

    return res.json({ question: question, message: "hi just created" })
})

app.get("/formquestionoption/:id", async (req, res) => {

    const question = await FormQuestionOption.findOne({
        where: { id: parseInt(req.params.id) }
    })

    return res.json({ question: question, message: "hi just created" })
})

app.get("/googleform/last", async (req, res) => {
    const googleForm = await GoogleForm.findOne({
        order: [["createdAt", "DESC"]]
    })

    res.json({ googleForm: googleForm })
})

app.get("/googleform/all", async (req, res) => {
    const googleForm = await GoogleForm.findAll({
        order: [["id"]]
    })

    res.json({ googleForm: googleForm })
})

app.get("/formquestionoption/all", async (req, res) => {
    const formQuestionOption = await FormQuestionOption.findAll({
        where: {formQuestionId: 1}
    })

    res.json({ googleForm: formQuestionOption })
})