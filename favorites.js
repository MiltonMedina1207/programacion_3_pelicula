const appFavorites = new Vue({
    el: '#favorites',
    data: {
        peliculasFavoritas: JSON.parse(localStorage.getItem("peliculasFavoritas") || "[]"),
    },
    methods: {
        removeMovie(index) {
            this.peliculasFavoritas.splice(index, 1);
            
            localStorage.setItem("peliculasFavoritas", JSON.stringify(this.peliculasFavoritas));
        },
    },
});