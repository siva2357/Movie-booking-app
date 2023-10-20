import {useState} from 'react'

let SCREENS = [
    {
        id: 1,
        time: "9:30am",
        seats: [1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    },
    {
        id: 2,
        time: "1:30pm",
        seats: [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
    },
    {
        id: 3,
        time: "6:30pm",
        seats: [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    },
    {
        id: 4,
        time: "9:30pm",
        seats: [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    },
];
const MOVIES = [
    {
        id: 1,
        title: "The Avengers",
        image: "https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg",
    },
    {
        id: 2,
        title: "Avengers age of Ultron",
        image: "https://upload.wikimedia.org/wikipedia/en/f/ff/Avengers_Age_of_Ultron_poster.jpg",
    },
    {
        id: 3,
        title: "Avengers Infinity War ",
        image: "https://upload.wikimedia.org/wikipedia/en/4/4d/Avengers_Infinity_War_poster.jpg",
    },
    {
        id: 4,
        title: "Avengers Endgame",
        image: "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
    },
];

export default function MovieBooking() {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedScreen, setSelectedScreen] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const handleSeatSelect = (index, screen) => {
        if (screen?.id !== selectedScreen?.id) {
            setSelectedSeats([index]);
            setSelectedScreen(screen)
            return }
        setSelectedScreen(screen)
        if (selectedSeats.includes(index)) {
            setSelectedSeats(selectedSeats.filter((i) => i !== index));
        if(selectedSeats.filter((i) => i !== index).length <1){
            setSelectedScreen()
        }
        }
        else {
            setSelectedSeats((seats) => [...seats, index])}
    }

    const handleBooking = () => {
        alert(`Seats ${selectedSeats.map((index) => index+1).join(", ")} booked for 
        ${selectedScreen.movie.title} at ${selectedScreen.time}`)
        SCREENS = SCREENS.map(screen => {
            if(screen.id === selectedScreen?.id){
                let seats = screen.seats;
                selectedSeats.forEach((seat) => (seats[seat] =0))
                return {
                    ...screen,
                    seats
                }
            }
            return screen
        })
        setSelectedMovie(null)
        selectedScreen(null)
        setSelectedSeats([])
    }

  return <div>
    <h1>Movie Booking App</h1>
    <h2>Choose your movie:</h2>
    <div className="movie-selection">
         {/* using map function for MOVIES  */} 
        {MOVIES.map((movie) =>(
            <div className="movie" key={movie.id} onClick={ ()=> setSelectedMovie(movie)}>
                <img className="movie-poster"src={movie.image} alt={movie.title}/>
                <div className="movie-title">{movie.title}</div>
            </div>
        ))}
    </div>
    {
        selectedMovie &&(
        <>
            <h2>Choose your screen</h2>
                <div className="screen-selection">
                {
                    SCREENS.map((screen) => {
                    return(
                        <div key={screen.id} className={`screen 
                        ${screen?.id === selectedScreen?.id ? 'selected' :''} 
                        ${screen.seats.includes(1) ? "available" : ""}`}>

                            <div className="screen-number"> {screen.id}</div>
                            <div className="screen-time"> {screen.time}</div> 
                            <div className="movie-title">{selectedMovie.title}</div>
                            <div className="screen-seats">
                                {
                                    screen.seats.map((seats, index) => {
                                        return(
                                            <div key={index} className={`seat 
                                            ${seats ? "available" : "Unavailable"} 
                                            ${selectedSeats.includes (index) && 
                                            selectedScreen?.id === screen.id ? "selected" :""}
                                            ${selectedSeats.includes(index) ? "booked" : ""}`}
                                            onClick={() => {
                                                if (seats){
                                                    handleSeatSelect(index, {
                                                        ...screen, movie:selectedMovie
                                                    })
                                                }
                                            }}>
                                                <div className="seat-number">{index+1}</div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        )})
                    }
                </div>
        </>
         )
    }  
    <div className="Booking-summary">
        <div className="selected-screen">
            {
                selectedScreen && (
                    <div>
                        <h3>Selected Screen:{selectedScreen.id}</h3>
                        <p>Time: {selectedScreen.time}</p>
                        <p>Movie: {selectedScreen.movie.title}</p>
                    </div>
                )
            }
        </div>

        <div className="Selected-seat">
            {
                selectedScreen && selectedSeats?.length>0 && (
                    <div>
                        <h3>Selected seats: <>{selectedSeats.map(index => index+1).join(",")}</></h3>
                        <h3>No.of tickets: <>{selectedSeats?.length}</></h3>
                    </div>
                )
            }
        </div>
        </div> 
        <button className="payment-button" onClick={handleBooking} 
        disabled={!selectedScreen || selectedSeats?.length === 0}>
            Book now
        </button> 
  </div>
}
