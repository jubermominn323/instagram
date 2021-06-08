import React from 'react'

const Home = () =>{
    return (
        <div className="home">
            <div className="card home-card">
                <h5>Ramesh</h5>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8d2FsbHBhcGVyfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{color: "red"}}>favorite</i>
                    <h4>title</h4>
                    <p>this is amazing body</p>
                    <input type="text" placeholder="Add a comment" />
                </div>
            </div>
        </div>
    )
}
export default Home