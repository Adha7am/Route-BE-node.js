const express = require("express")
const fs = require("node:fs").promises
const fss = require("node:fs")

//helper functions
async function readUsers() {
    const data = await fs.readFile("./users.json", { "encoding": "utf8" })
    return JSON.parse(data)
}

async function WriteToUsers(users) {
    await fs.writeFile("./users.json", JSON.stringify(users))
}

const app = express();
app.use(express.json())

//POST User after checking if email does not exist 
app.post('/user', async (req, res) => {

    let users = await readUsers()
    const user = users.find((u) => u.email === req.body.email)

    if (user) {
        throw new Error("user email already exists", { cause: 404 })
    }

    users.push(req.body)

    await WriteToUsers(users)

    res.status(201).json({ "message": "user added successfully!" })
})

//PATCH User by Id
app.patch("/user/:id", async (req, res) => {
    const { age, name, email } = req.body


    let users = await readUsers();

    const userIndex = users.findIndex((u) => u.id == req.params.id)

    if (userIndex === -1) {
        throw new Error("User Id not found...", { "cause": 404 })
    }

    users[userIndex].name = name || users[userIndex].name;
    users[userIndex].age = age || users[userIndex].age;
    users[userIndex].email = email || users[userIndex].email;

    await WriteToUsers(users)

    res.status(200).json({ "message": "User Updated Successfully!" })
})

//DELETE User by Id
app.delete("/user/:id", async (req, res) => {

    let users = await readUsers()

    const userExists = users.find((u) => u.id == req.params.id)

    if (!userExists) { throw new Error("User Id Does not Exist", { "cause": 404 }) }


    users = users.filter((u) => u.id != req.params.id)
    await WriteToUsers(users)
    res.status(200).json({ "message": "User Deleted Successfully." })

})

//GET User by name
app.get('/getByName', async (req, res) => {

    const users = await readUsers()

    const targetUser = users.find((u) => u.name == req.query.name)

    if (!targetUser) throw new Error('User name not found', { "cause": 404 })
    res.status(200).json(targetUser);
})

//GET all users
app.get('/user', async (req, res) => {
    res.status(200).send(await readUsers())
})

//GET Users by min. age ==> order matters, before the "/user/:id"   
app.get('/user/filter', async (req, res) => {

    const minAge = Number(req.query.minAge)

    if (isNaN(minAge)) throw new Error('minAge must be a Number', { "cause": 404 })
    const users = await readUsers();

    let validUsers = users.filter(u => u.age >= minAge);
    if (validUsers.length === 0) throw new Error("no user found", { "cause": 404 })

    res.status(200).json(validUsers)

})

//GET User by Id
app.get('/user/:id', async (req, res) => {

    const id = Number(req.params.id)
    if (isNaN(id)) throw new Error('id must be a Number', { "cause": 404 })

    let users = await readUsers();

    let user = users.find((u) => u.id == id)
    if (!user) {
        throw new Error("User not found...", { "cause": 404 })
    }
    res.status(200).json(user);

})

app.use((err, _req, res, _next) => {
    res.status(err.cause || 500).json({ "message": err.message, "stack": err.stack })
})

app.listen(3000, () => {
    console.log("running on port 3000");
})

