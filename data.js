const app = new Vue({
    el: '#data',
    data: {
        completed: false,
        movie: {
            id: '',
            title: '',
            overview: '',
            poster_path: '',
            averageRating: '',
            genres: '',
        },
        lista: [],
        searchTerm: '',
        filteredMovies: [],
        },
        mounted() {
            this.getMovies();
            this.filterMovies();
        },
        methods: {
        async getMovies() {
            const endPoint = 'https://api.themoviedb.org/3';
            const apiKey = 'e031b4af9279b55b3f8e93ada4fb04a7';
            const API_URL = `${endPoint}/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;

            try {
            const response = await fetch(API_URL);
            const data = await response.json();

            this.lista = data.results;
            this.filteredMovies = this.lista;

            console.log(data);
            
            this.completed = true;
            } catch (error) {
            console.log(error);
            }
            
        },

        filterMovies() {
            const searchTerm = this.searchTerm.toLowerCase();
            if (!searchTerm) {
                this.filteredMovies = this.lista;
            } else {
                this.filteredMovies = this.lista.filter(movie =>
                    movie.title.toLowerCase().includes(searchTerm)
                );
            }
        },
        

        openDescription(movie) {
            console.log(movie.id);
            window.location = `details.html?id=${movie.id}`;
        }
    },
});