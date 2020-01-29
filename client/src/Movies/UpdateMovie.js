import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

const initialState = {
    title: "",
    director: "",
    metascore: "",
    actors: ""
}

const UpdateMovie = () => {
    const [movie, setMovie] = useState(initialState);
    const {id} = useParams();

    const handleChanges = e => {
        let value = e.target.value;

        setMovie({
            ...movie,
            [e.target.name]: value
        })
    }

    return(
        <div className="update-movie-card">
            <div className="updateB"> 
                <label className="updateLabel" htmlFor="title">Title: </label>
                <input className="updateInput" id="title" type="text" onChange={handleChanges} name="title" value={movie.title} />
            </div>
            <div className="updateB">
                <label className="updateLabel" htmlFor="director">Director: </label>
                <input className="updateInput" id="director" type="text" onChange={handleChanges} name="director" value={movie.director} />
            </div>
           <div className="updateB">
               <label className="updateLabel" htmlFor="metascore">Metascore: </label>
                <input className="updateInput" id="metascore" type="text" onChange={handleChanges} name="metascore" value={movie.metascore} />
           </div>
            <div className="updateB">
                <label className="updateLabel" htmlFor="actors">Actors: </label>
                <input className="updateInput" id="actors" type="text" onChange={handleChanges} name="actors" value={movie.actors} />
            </div>
            
            
            <div><button>Update</button></div>
        </div>
    )
}

export default UpdateMovie;