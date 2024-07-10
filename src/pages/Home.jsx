import React from "react";
import {Link} from "react-router-dom"
import './Home.css'



const Home = () =>{
    return (
        <div className="home-container">
            <h2>NovelNest</h2>
            <h1>Welcome to NovelNest</h1>
            <p>Discover new worlds, dive into fascinating stories, and share your reading adventures. Connect with fellow book lovers and enrich your reading journey right here at NovelNest.</p>

            <Link to="/novellist"><button>Explore Collection</button></Link>


        </div>
    )
}
export default Home