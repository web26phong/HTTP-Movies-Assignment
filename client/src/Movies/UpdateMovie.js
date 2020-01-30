import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

const initialState = {
    title: "",
    director: "",
    metascore: "",
    stars: ""
}

const UpdateMovie = (props) => {
    const [movie, setMovie] = useState(initialState);
    const {id} = useParams();
    const [movies, setMovies] = useState([])

    useEffect(()=>{
        
        axios
        .get("http://localhost:5000/api/movies")
        .then(res => {
            setMovies(res.data)
        })
            
        .catch(err => console.log(err.response));
    }, [])

    useEffect(()=>{
        const movieToUpdate = movies.find(movie => `${movie.id}` === id)
        if (movieToUpdate){
            setMovie({
                ...movieToUpdate,
                stars: movieToUpdate.stars.toString()
            })
        }
    }, [movies, id])

    const handleChanges = e => {
        let value = e.target.value;

        setMovie({
            ...movie,
            [e.target.name]: value
        })
    }

    const handleUpdate = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${id}`, {...movie, stars: movie.stars.split(",")})
        .then(res => {
            setMovie({
                ...res.data,
                stars: res.data.stars.toString()
            })
            props.history.push("/")
        })
        .catch(err => {
            console.log(err)
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
                <input className="updateInput" id="actors" type="text" onChange={handleChanges} name="stars" value={movie.stars} />
            </div>
            
            
            <div><button onClick={handleUpdate}>Update</button></div>
        </div>
    )
}

export default UpdateMovie;