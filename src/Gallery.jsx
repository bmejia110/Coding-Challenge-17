import React, {useState, useEffect } from "react";
import "./Gallery.css";

const Gallery = () => {
    const[tours, setTours] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    //fetch tour data

    useEffect(() => {
        const fetchTours =async () => {
            try {
                const response = await fetch("https://course-api.com/react-tours-project");
                console.log(response);
                if (!response.ok) {
                    throw new Error("Failed to fetch tours");
                }
                const data = await response.json();
                setTours(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError(error.message);
                setLoading(false);
            }
        };
        fetchTours();
    }, []);


    //removing a tour
    const removeTour = (id) => {
        setTours(tours.filter((tour) => tour.id !== id));
    };

    //error message to notify user

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>;

    return(
        <div>
            {tours.map((tour) => (
                <div key={tour.id} className="tour-card">
                    <img src={tour.image} alt={tour.name} />
                    <h2>{tour.name}</h2>
                    <p>${tour.price}</p>
                    <p>
                        {tour.showMore ? tour.info : '${tour.info.substring(0,100)}....'}
                        <button onClick={() => toggleDescription(tour.id)}>
                            {tour.showMore ? 'Show Less' : 'Read More'}
                        </button>
                    </p>
                    <button onClick={() => removeTour(tour.id)}> Not Interested</button>
                    </div>
            ))}
        </div>
    );
};

export default Gallery;