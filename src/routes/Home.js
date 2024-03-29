import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Movie from "../components/Movie";
import styles from "./Home.module.css";

function Home() {
    const location = useLocation();
    const rating = location.state?.rating;
    const [ratingMovies, setRatingMovies] = useState(rating || 8);
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    // awync-await
    const getMovies = async () => {
        const json = await (
            await fetch(
                `https://yts.mx/api/v2/list_movies.json?minimum_rating=${ratingMovies}&sort_by=year`
            )
        ).json();
        setMovies(json.data.movies);
        setLoading(false);
    };
    useEffect(() => {
        getMovies();
    }, [ratingMovies]);

    return (
        <div>
            <div className={styles.movie}>
                <h3>Movies that fits your rating</h3>
                <div>
                    <div>Rate : {ratingMovies}</div>
                    <input
                        type="range"
                        placeholder="Rating 0~10"
                        value={ratingMovies}
                        min="1"
                        max="10"
                        step="0.5"
                        onChange={(event) => setRatingMovies(event.target.value)}
                    />
                </div>
            </div>
            <div className={styles.container}>
                {loading ? (
                    <h1>Loading...</h1>
                ) : (
                    <div className={styles.movies}>
                        {movies.map((movie) => (
                            <Movie
                                key={movie.id}
                                id={movie.id}
                                coverImg={movie.medium_cover_image}
                                year={movie.year}
                                title={movie.title}
                                summary={movie.summary}
                                genres={movie.genres}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;

// useEffect(() => {
//     fetch(
//         "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
//     )
//         .then((response) => response.json())
//         .then((json) => {
//             setMovies(json.date.movies);
//             setLoading(false);
//         });
// }, []);
