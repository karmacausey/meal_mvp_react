import React from "react";
import { useState } from "react";
import LoginPage from "./components/LoginPage"
import NewUserPage from "./components/NewUserPage"
import FavoritesPage from "./components/FavoritesPage"
import SearchResultsPage from "./components/SearchResultsPage";


function App() {
  //State
  const [server] = useState("http://localhost:3001") //this server variable should be changed on deployment
  const [page, loadPage] = useState("login")
  const [user, setUser] = useState(null)
  const [searchResults, storeResults] = useState(null)
  //Functions
  const loginUser = (username, pword) => { 
    console.log(`entered loginUser function | username: ${username} | pword: ${pword}`)   
    fetch(`${server}/user`, {
      method: "POST",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: `${username}`, password: `${pword}` })
    })
    .then((res) => res.json())     
    .then((data) => setUser(data))   
    .catch(console.error())
  }

  const createNewUser = (username, pword) => { 
    console.log("entered createNewUser function")   
    fetch(`${server}/newuser`, {
      method: "POST",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: `${username}`, password: `${pword}` })
    })
    .then(() => loadPage("login"))
  }

  const submitSearch = async (searchText) => {
    console.log("entered submitSearch async function")
    fetch(`${server}/search/${searchText}`, {
        method: "GET",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
        }       
      })
      .then((res) => res.json())
      .then((data) => storeResults(data))
      .catch(console.error())
      // console.log(`stored search results in searchResults: ${searchResults}`)
      // console.log(`searchResults.ingredientList: ${searchResults.ingredientList}`)         
  }

  const clickSearchItem = async (meal_id) => {
    console.log("entered clickSearchItem async function")
    fetch(`${server}/favorite`, {
      method: "POST",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: `${user.user_id}`, meal_id: `${meal_id}` })  
    })
    .then((res) => res.json())
    .catch(console.error())
  }

  // const clickFavorite = async (meal_id) => {
  //   console.log("entered clickFavorite async function")
  //   fetch(`${server}/favorite`, {
  //     method: "POST",
  //     mode: 'cors',
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ user_id: `${user.user_id}`, meal_id: `${meal_id}` })  
  //   })
  //   .then((res) => res.json())
  //   .then((data) => storeResults(data))
  //   .catch(console.error())
  // }

  const loadNewUserPage = ()=> {
    console.log("loadNewUserPage called")
    loadPage("newUser")
  }

  //debugging messages
    console.log('entered page conditionals')
    console.log('page: ' + page)    
    console.log('user: ' + user)
    console.log('user')
    console.log('searchResults: ' + searchResults)
    //conditional rendering
    if(page === "login"){            
      if(user === null){
        return <LoginPage newUserClick={loadNewUserPage} clickEvent={loginUser}/>
      } else if (user.validated && !searchResults){
        return <FavoritesPage username={user.name} favorites={user.favorites} clickEvent={submitSearch}/>      
      } else if (user.validated && searchResults){
        return <SearchResultsPage username={user.name} searchResults={searchResults} clickItem={clickSearchItem} clickEvent={submitSearch}/>      
      }
    }else if(page === "newUser"){
      return <NewUserPage clickEvent={createNewUser}/>
    }else{
    console.log("conditional rendering failed")
    }
}

export default App;
