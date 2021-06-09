import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Signup = () =>{
    const history = useHistory()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const PostData = () =>{
        if(! /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalild Email", classes: "#c62828 red darken"})
            return
        }
        fetch("/signup",{
            method: "post",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            })
        }).then(res => res.json())
        .then(data =>{
            if(data.error){
                M.toast({html: data.error, classes: "#c62828 red darken"})
            }
            else{
                M.toast({html: data.message, classes:"#43a047 green darken"})
                history.push("/signin")
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="mycard">
             <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder="name" />
                <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="email" />
                <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="password" />
                <button onClick={() =>PostData()} className="btn waves-effect waves-light #64b5f6 blue darken-1">
                    Signup
                </button>
                <h5>
                    <Link to="/signin">
                        Already have an account
                    </Link>
                </h5>
            </div>
      </div>
    )
}
export default Signup