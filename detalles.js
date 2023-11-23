
const appDescription = new Vue({
    el: '#descripcion',
    data: {
        id: '',            // Almacenar el ID de la película
        movie: {},         // Almacenar la información de la película
        title: '',         // Almacenar el título de la película
        overview: '',      // Almacenar la descripción general de la película
        poster_path: '',   // Almacenar la ruta del póster de la película
        peliculasFavoritas: [],  // Almacenar la lista de películas favoritas
        genres: '',        // Almacenar los géneros de la película en forma de cadena
    },
    methods: {
        // Método para obtener la información de la película desde la API
        getMovie() {
            const movieId = this.id;

            // Realizar una solicitud a la API para obtener detalles de la película
            fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=e031b4af9279b55b3f8e93ada4fb04a7`)
                .then(response => response.json())
                .then(data => {
                    this.movie = data;
                    this.title = data.title;
                    this.overview = data.overview;
                    this.poster_path = data.poster_path;

                    // Obtener el género de la película
                    const genreIds = data.genre_ids;
                    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=e031b4af9279b55b3f8e93ada4fb04a7&language=es`)
                        .then(response => response.json())
                        .then(genresData => {
                            const genres = genresData.genres;
                            const movieGenres = genres.filter(genre => genreIds.includes(genre.id));
                            this.movie.genres = movieGenres.map(genre => genre.name).join(', ');
                        });

                    // Obtener la valoración de la película
                    fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=e031b4af9279b55b3f8e93ada4fb04a7`)
                        .then(response => response.json())
                        .then(reviewsData => {
                            const reviews = reviewsData.results;
                            const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
                            this.movie.averageRating = averageRating.toFixed(2);
                        });
                });
        },

        // Método para agregar la película actual a la lista de favoritos
        addMovieToFavorites() {
            // Obtener las películas favoritas existentes del almacenamiento local
            const storedMovies = JSON.parse(localStorage.getItem("peliculasFavoritas")) || [];

            // Verificar si la película ya está en favoritos antes de agregarla
            const exists = storedMovies.some(favoriteMovie => favoriteMovie.id === this.movie.id);

            if (!exists) {
                // Si no existe, agregar la película actual a las favoritas
                storedMovies.push(this.movie);

                // Guardar la lista actualizada en el almacenamiento local
                localStorage.setItem("peliculasFavoritas", JSON.stringify(storedMovies));

                // También actualiza el array en el componente para reflejar el cambio en la interfaz
                this.peliculasFavoritas = storedMovies;

                window.alert("Película agregada a favoritos con éxito");
            } else {
                // Si la película ya está en favoritos, mostrar un mensaje informativo
                window.alert("Esta película ya está en tus favoritos");
            }
        },
    },
    mounted() {
        // Obtener el ID de la película de la cadena de consulta de la URL
        const urlParams = new URLSearchParams(window.location.search);
        this.id = parseInt(urlParams.get('id'), 10);

        // Obtener datos de la película al cargar el componente
        this.getMovie();
    }
});
