const http = require("node:http")
const fs = require("node:fs");
const fsp = require("node:fs").promises
const { json } = require("node:stream/consumers");

let message = "somethhing went wrong";
const newUser = { id: 10, name: "him", age: 33, email: "newuser99@gmail.com" }

//Add User to file after checking email :-
function addUser(newUser, callback) {
    fs.readFile("./users.json", "utf8", (err, data) => {
        if (err) return callback(err);

        const users = JSON.parse(data);
        const exists = users.some(u => u.email === newUser.email);

        if (exists) return callback(null, "Email Already Exists")

        users.push(newUser)
        fs.writeFile("./users.json", JSON.stringify(users), (err) => {
            if (err) return callback(err)
            callback(null, "user Added Successfully!")
        });
    });
}
//----------------------------------------------------------------------------

//Update User usig id :-
function updateUser(id, attr, value, callback) {
    fs.readFile("./users.json", (err, data) => {
        if (err) return callback(err)

        const users = JSON.parse(data);

        const TargetUser = users.find(u => u.id == id)

        if (!TargetUser) return callback(null, "user id does not exist")

        TargetUser[attr] = value
        fs.writeFile("./users.json", JSON.stringify(users), (err) => {
            if (err) return callback(err);
            return callback(null, "updated successfully!")
        })
    })
}
//----------------------------------------------------------------------------

//Delete User Using id :-
async function deleteUser(id) {
    try {
        const data = await fsp.readFile("./users.json", "utf8");
        console.log("this is the data from readFile : " + data);
        const users = JSON.parse(data)

        const TargetUser = users.find(u => u.id == id)
        if (!TargetUser) return "User Id Does not Exist"

        const updatedUsers = users.filter((u) => u.id != id)
        console.log(updatedUsers);
        await fsp.writeFile("./users.json", JSON.stringify(updatedUsers))

        return "Deleted User Successfully!"
    } catch (err) {
        throw err
    }

}
//----------------------------------------------------------------------------

// Get all Users :=
async function getAllusers() {
    const data = await fsp.readFile("./users.json")
    return JSON.parse(data)
}
//----------------------------------------------------------------------------

// Get User by Id :-
async function getUser(id) {
    try {
        const data = await fsp.readFile("./users.json")
        const users = JSON.parse(data);
        const TargetUser = users.find((u) => u.id == id)

        if (!TargetUser) return "User id does not exist"

        return TargetUser

    } catch (err) {
        throw err
    }

}

const server = http.createServer(async (req, res) => {
    const { url, method } = req;
    // ADD user Route
    if (url === "/user" && method === "POST") {
        addUser(newUser, (err, message) => {
            if (err) {
                res.writeHead(500, { "content-type": "application/json" });
                return res.end(JSON.stringify({ message: err.message }));

            }
            else {
                res.writeHead(200, { "content-type": "application/json" })
                res.end(JSON.stringify({ message }))
            }
        })

    } //UPDATE User Route
    else if (url.startsWith("/update") && method === "PATCH") {
        const id = url.split('/')[2]

        updateUser(id, "name", "7ambozo", (err, message) => {
            if (err) {
                res.writeHead(500, { "content-type": "application/json" });
                return res.end(JSON.stringify({ message: err.message }));

            }
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify({ message }));

        })
    } // DELETE User Route
    else if (url.startsWith("/delete") && method === "DELETE") {

        const id = url.split('/')[2]
        try {
            const message = await deleteUser(id);
            res.writeHead(200, { "content-type": "application/json" })
            res.end(JSON.stringify({ message }))

        } catch (err) {
            res.writeHead(500, { "content-type": "application/json" })
            res.end(JSON.stringify({ message: err.message }))

        }
    } // GET all Users Route
    else if (url === "/user" && method === "GET") {
        const id = url.split('/')[2]

        try {
            const allUsers = await getAllusers()
            res.writeHead(200, { "content-type": "application/json" })
            res.end(JSON.stringify(allUsers))

        } catch (err) {
            res.writeHead(500, { "content-type": "application/json" })
            res.end(JSON.stringify({ message: err.message }))
        }

    } // GET User by Id Route
    else if (url.startsWith("/user") && method === "GET") {
        const id = url.split('/')[2]

        try {
            const TargetUser = await getUser(id)
            res.writeHead(200, { "content-type": "application/json" })
            res.end(JSON.stringify(TargetUser))

        } catch (err) {
            res.writeHead(500, { "content-type": "application/json" })
            res.end(JSON.stringify({ message: err.message }))

        }
    }// Wrong Routes Handling
    else {
        res.writeHead(404, { "content-type": "application/json" })
        res.end(JSON.stringify({ "message": "Wrong Route!" }))

    }
})

server.listen(3000, () => {
    console.log("Server Is Running On Port 3000");
})



