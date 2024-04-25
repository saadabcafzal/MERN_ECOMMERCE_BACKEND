import axios from "axios"


const instance = axios.create({
    baseURL :"https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTQxNjM4ZjRlZWM5MDhjNzE3NmE4NDRlODFkNjRmMCIsInN1YiI6IjY1YjEyODY2ZGQ5MjZhMDE3MzRkMjRkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1_3lwwC-crvmiFsaAbNrsNcQ42JWAl3YwCJjs8s98QU'
      }
})

export default instance;