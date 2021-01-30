import axios from 'axios'
import React, { useState, useEffect, useMemo } from 'react'

function Users() {

    const [persons, setPersons] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            if(res)
            setPersons(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])    

    const handleChange = e => {
        setSearch(e.target.value)
    }

    const personList = useMemo(
        () => persons
        .filter(person => person.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
        .map(person => (
            <tr key={person.id}>
                <td>{person.name}</td>
                <td>{person.username}</td>
                <td>{person.email}</td>
                <td>{person.address.suite} {person.address.street} {person.address.city}</td>
            </tr>
        )), 
        [search, persons]  
    )   

    return (
        <div>
            <div className="searchbox">
                <input type="text" placeholder="Search names here.." onChange={handleChange} />
            </div>
           <table className="table table-striped">
               <thead>
                   <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>    
                    <th>Address</th>              
                   </tr>
               </thead>
               <tbody>
                   { personList }
               </tbody>
           </table>
        </div>
    )
}

export default Users
