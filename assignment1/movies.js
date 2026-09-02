const movies = [
  {
    id: 1,
    title: 'The Godfather',
    director: 'Francis Ford Coppola',
    year: 1972,
    genres: ['Crime', 'Drama'],
    rating: 10,
  },
  {
    id: 2,
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    year: 2008,
    genres: ['Action', 'Crime'],
    rating: 9,
  },
  {
    id: 3,
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino',
    year: 1994,
    genres: ['Crime', 'Drama'],
    rating: 9,
  },
  {
    id: 4,
    title: 'Inception',
    director: 'Christopher Nolan',
    year: 2010,
    genres: ['Action', 'Sci-Fi'],
    rating: 8,
  },
  {
    id: 5,
    title: 'The Matrix',
    director: 'Lana Wachowski',
    year: 1999,
    genres: ['Sci-Fi', 'Action'],
    rating: 8,
  },
  {
    id: 6,
    title: 'Interstellar',
    director: 'Christopher Nolan',
    year: 2014,
    genres: ['Drama', 'Sci-Fi'],
    rating: 7,
  },
];

// Task 1: Add Movie
function addMovie(movieData) {
	//catches case of empty array or array with ids below 0
	minimumIDMinusOne = 0
	const newId = Math.max(minimumIDMinusOne, ...movies.map(movie => movie.id)) + 1;

	
	movieData = {
		id: newId,
		...movieData
	};
	
	movies.push(movieData);
	
	return movieData;
}

// Task 2: Update Rating
function updateRating(id, newRating) {

	const updatedMovie = movies.find((movie) => movie.id === id);
	
	if (updatedMovie) {
		updatedMovie.rating = newRating;
	}
	
	return updatedMovie ? updatedMovie : null;
}

// Task 3: Delete Movie
function deleteMovie(id) {
	const movieToDelete = movies.find((movie) => movie.id === id);

	if (movieToDelete) {
		const movieInd = movies.indexOf(movieToDelete)
		movies.splice(movieInd, 1)
		return true;

	}

	return false;
}

// Task 4: Find By Director
function findByDirector(director) {
	const moviesDirected = movies.filter(movie => movie.director === director)
	const movieTitlesDirected = moviesDirected.map(movie => movie.title)

	return movieTitlesDirected
}

// Task 5: Filter By Genre
function filterByGenre(genre) {
	const moviesWithGenre = movies.filter(movie => movie.genres.includes(genre))
	return moviesWithGenre.map(movie => movie.title)
}

// Task 6: Average Rating
function averageRating() {
	const ratings = movies.map(movie => movie.rating);
	if (ratings.length === 0) {
		return 0;
	}
	return ratings.reduce((rating, sum) => sum + rating, 0) / ratings.length
}

// Task 7: Movies Before Year
function moviesBefore(year) {
	const moviesBefore = movies.filter(movie => movie.year < year)
	return moviesBefore.map(movie => movie.title)
}

// Task 8: Get Top Rated Movies
function getTopRated(limit) {
	const sorted = movies.toSorted((a, b) => b.rating - a.rating);
	const topRated = []
	for (let i =0; i < Math.min(limit, sorted.length); i++) {
		topRated.push(sorted[i])
	}

	return topRated;
}

// Uncomment the lines below to test your functions locally:
console.log("\n--- Task 1: Adding a new movie ---");
const newMovie = addMovie({ title: "Test Movie", director: "Test Dir", year: 2021, genres: ["Test"], rating: 7 });
console.log(newMovie);
console.log("Movies after adding:", movies);

console.log("\n--- Task 2: Updating rating ---");
console.log(updateRating(newMovie ? newMovie.id : 7, 9));
console.log("Updating non-existent ID 999:", updateRating(999, 10));

console.log("\n--- Task 3: Deleting a movie ---");
console.log("Delete created movie:", deleteMovie(newMovie ? newMovie.id : 7));
console.log("Delete non-existent ID 999:", deleteMovie(999));

console.log("\n--- Task 4: Find by director ---");
console.log(findByDirector("Christopher Nolan"));

console.log("\n--- Task 5: Filter by genre ---");
console.log(filterByGenre("Sci-Fi"));

console.log("\n--- Task 6: Average rating ---");
console.log(averageRating());

console.log("\n--- Task 7: Movies before 2000 ---");
console.log(moviesBefore(1972));

console.log("\n--- Task 8: Top 3 rated movies ---");
console.log(getTopRated(3));

// Export all functions and movies array
module.exports = {
  movies,
  addMovie,
  findByDirector,
  filterByGenre,
  averageRating,
  moviesBefore,
  updateRating,
  deleteMovie,
  getTopRated,
};
