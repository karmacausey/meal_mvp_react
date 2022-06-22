require("dotenv").config();
const express = require("express");
const db = require("./db/conn.js");
const fetch = require('node-fetch');
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(express.static("public"));

//must reset headers for deployment
//Setting CORS policy headers
function setCorsHeader(req, res, next){
    cors();
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,DELETE,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
}
//call middleware to set the CORS headers
app.use(setCorsHeader)

//Create: new user
app.post("/newuser", async (req, res) => {
    try {
        db.query('INSERT INTO Users (user_name, password) VALUES ($1,$2);', [req.body.name, req.body.password]);
        res.json({ status: "entered" });
    } catch (error) {
        res.json(error);
    }
});

//Read: user gets validated by database and if they have favorites they are loaded to the user object that is sent back
app.post("/user", async (req, res) => {
    try {        
        // console.log("calling user route")
        // console.log(`req.body.name: ${req.body.name} | req.body.password: ${req.body.password}`)
        const userData = await db.query('SELECT user_name, user_id, password FROM Users WHERE user_name = $1 AND password = $2;', [req.body.name, req.body.password])
        // console.log(`userData.rows[0].user_id: ${userData.rows[0].user_id}`)
        if (userData.rows.length !== 0) {
            const userFavorites = await db.query('SELECT meal_id FROM Favorites WHERE user_id = $1;', [userData.rows[0].user_id]);
            //console.log(`userFavorites.rows[0].meal_id: ${userFavorites.rows[0].meal_id}`)
            const favArray = [];
            for (let i = 0; i < userFavorites.rows.length; i++) {
                //console.log("inside /user for loop")
                
                let resp = await fetch(`https://api.edamam.com/api/recipes/v2/${userFavorites.rows[i].meal_id}?type=public&app_id=e5eac9e7&app_key=ce3b16e9e298aa97fbc47836d7c160bf%09`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                let data = await resp.json();                
                const currentFav = {
                    meal_id: `${userFavorites.rows[i].meal_id}`,
                    name: `${data.recipe.label}`,
                    image_url: `${data.recipe.images.REGULAR.url}`,
                    ingredient_list: `${data.recipe.ingredientLines}`,
                }
                console.log(currentFav)
                favArray[i] = currentFav;                
            }
            const user = {
                user_id: `${userData.rows[0].user_id}`,
                name: `${userData.rows[0].user_name}`,
                password: `${userData.rows[0].password}`,
                validated: true,
                favorites: favArray
            }
            // console.log(`user.name: ${user.name}`);
            // console.log(`user.user_id: ${user.user_id}`);
            // console.log(`user.password: ${user.password}`);
            // console.log(`user.validated: ${user.validated}`);
            // console.log(`user.favorites[0]: ${user.favorites[0]}`);
            res.json(user);
        } else {
            //console.log(`userData.rows.length: ${userData.rows.length}`)
            res.json({ validated: false })
        }
    } catch (error) {
        console.log(error)
        res.json(error);
    }
});

//read: search edamam api recipes by user entered keyword
app.get("/search/:keyword", async (req, res) => {
    try {
        //query edam api
        let response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${req.params.keyword}&app_id=e5eac9e7&app_key=ce3b16e9e298aa97fbc47836d7c160bf`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        let data = await response.json();
        let resultArray = [];
        for (let i = 0; i < data.hits.length && i < 50; i++) {
            let uriParts = data.hits[i].recipe.uri.split('_');
            let rID = uriParts[uriParts.length - 1];
            console.log("rID: " + rID);
            const currentResult = {
                recipe_id: `${rID}`,
                image_url: `${data.hits[i].recipe.images.REGULAR.url}`,
                name: `${data.hits[i].recipe.label}`,
                ingredient_list: `${data.hits[i].recipe.ingredientLines}`,
            }
            resultArray.push(currentResult)
        }
        res.json(resultArray)
    } catch (error) {
        res.json(error);
    }
});

//create: add a users new favorite recipe to the database
app.post("/favorite", async (req, res) => {
    try {
        console.log(`req.body.user_id: ${req.body.user_id}, req.body.meal_id: ${req.body.meal_id}`)
        const data = await db.query('INSERT INTO Favorites (user_id, meal_id) VALUES ($1,$2);', [req.body.user_id, req.body.meal_id]);
        res.json(req.body);
    } catch (error) {
        res.json(error);
    }
});

//delete: delete a favorite recipe from users list
// app.delete("/favorite", async (req, res) => {
//     try {
//         db.query('DELETE FROM Meals WHERE meal_id=$1', [req.body.meal_id]);
//         db.query('DELETE FROM Favorites WHERE meal_id=$1', [req.body.meal_id]);
//         res.json(req.body);
//     } catch (error) {
//         res.json(error);
//     }
// })

// future functionality
//update: reset password
// app.patch("/password", async (req, res) => {
//     try {
//         db.query('UPDATE Users SET password = $1 WHERE user_id=$2;', [req.body.password, req.body.user_id]);
//         res.json(req.body);
//     } catch (error) {
//         res.json(error);
//     }
// })

app.listen(process.env.PORT, () => {
    console.log(`connecting to: ${process.env.DATABASE_URL}`);
    console.log(`listening on Port ${process.env.PORT}`);
});