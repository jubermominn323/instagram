import React,{useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'

const Profile = () =>{
    const [mypics, setPics] = useState([])
    const {state, dispatch} = useContext(UserContext)
    useEffect(() => {
        fetch("myposts", {
            headers: {
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result =>{
            console.log(result)
            setPics(result.myposts)
        })
    }, [])
    return (
        <div style={{maxWidth:"550px", margin: "0px auto"}}>
        <div style={{
            display:"flex",
            justifyContent:"space-around",
            margin:"18px 0px",
            borderBottom: "1px solid grey"
        }}>
            <div>
                <img src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" 
                style={{width:"160px", height:"160px", borderRadius:"80px"}} />
            </div>
            <div>
                <h4>{state ? state.name : "loading"}</h4>
                <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                    <h6>40 posts</h6>
                    <h6>40 followers</h6>
                    <h6>40 following</h6>
                </div>
            </div>
        </div>
            <div className="gallery">
                {
                    mypics.map(item =>{
                        return (
                            <img className="item" src={item.photo} key={item._id} alt={item.title} />
                        )
                    })
                }
               </div>
        </div>
    )
}
export default Profile