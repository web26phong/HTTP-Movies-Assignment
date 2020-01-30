import React, {useState, useEffect} from "react";
import axios from "axios";

const initialState = {
    title: "",
    director: "",
    metascore: "",
    stars: ""
}


const AddMovie = (props) => {
    const [movie, setMovie] = useState(initialState);
    const [newMovieId, setNewMovieId] = useState();

    useEffect(()=>{
        axios.get("http://localhost:5000/api/movies")
        .then(res => {
            setNewMovieId(res.data.length+1)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const handleAdd = e => {
        e.preventDefault();
        axios
        .post(`http://localhost:5000/api/movies`, {...movie, stars: movie.stars.split(","), id: newMovieId})
        .then(res => {
            props.history.push("/")
        })
    }
    
    const handleChanges = e => {
        let value = e.target.value;

        setMovie({
            ...movie,
            [e.target.name]: value
        })
    }
    return (
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
                <input className="updateInput" title="separate multiple actors with commas (,)" placeholder="Separate with commas" id="actors" type="text" onChange={handleChanges} name="stars" value={movie.stars} />
            </div>
            
            
            <div><button onClick={handleAdd}>Add</button></div>
        </div>
    )
}

export default AddMovie;