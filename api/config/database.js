const mongoose = require('mongoose');
const env = require('./env.js');
const Role = require('../model/role.model');
const User = require('../model/user.model');
const Genre = require('../model/genre.model');
const Movie = require('../model/movie.model');
const Serial = require('../model/serial.model');
const bcrypt = require('bcryptjs');
const axios = require('axios');


async function initial(){


    console.log("######################################");
    console.log("ADMIN INIT");
    console.log("######################################");

    await Role.countDocuments( (err, count) => {
        if(!err && count === 0) {
            console.log("Init role index.");
            // USER Role ->
            new Role({
                name: 'USER'
            }).save()
                .then(() => {
                    console.log("USER_ROLE is added");
                })
                .catch(err => {
                    console.error(err.stack);
                });

            // ADMIN Role ->
            new Role({
                name: 'ADMIN'
            }).save()
                .then(() => {
                    console.log("ADMIN_ROLE is added");
                })
                .catch(err => {
                    console.error(err.stack);
                });
        }
    });

    let adminId;
    let userId;

    await Role.findOne({name:'USER'}).then(res => {
        userId = res._id;
    });

    await Role.findOne({name:'ADMIN'}).then(res => {
        adminId = res._id;
    });



    await User.countDocuments( (err, count) => {
        if(!err && count === 0){

            console.log("Init user admin.");

            return new User({
                username:   'root',
                name:       'admin',
                email:      'admin@gmail.com',
                password:   bcrypt.hashSync("root", 8),
                roles : [userId,adminId]
            }).save()
                .then(() => {
                    console.log("ADMIN is added");
                })
                .catch(err => {
                    return console.error(err.stack);
                })
        } else{
            console.log("Admin already init");
        }

    });

}


async function getAllSerial(){

    console.log("######################################");
    console.log("SERIALS DOWNLOAD");
    console.log("######################################");

    let i = 1 ;

    for (i ; i < 4 ; i++){

        console.log("page : "+i);

        await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=3942737097dcd29145fe000304ac2294&language=fr-FR&page='+i)
            .then(response => {
                let serials = response.data.results;
                return checkSerials(serials);
            })
            .catch(error => {
                console.log(error);
            });
    }
}

async function checkSerials(serials) {
    for(const serial of serials ){

        await Serial.findOne({ id: serial.id })
            .then(res => {
                if(res) {
                    console.log("Serial "+res.name+" already there");
                }else {
                    return insertSerial(serial);
                }
            })

    }
}

async function insertSerial(serial) {
    serial.genre = [];

    for(const id of serial.genre_ids){
        await Genre.findOne({id: id})
            .then(res => {
                if(res){
                    serial.genre.push(res._id);
                }
            })
    }
    serial.backdrop_path = "https://image.tmdb.org/t/p/original"+serial.backdrop_path;
    serial.poster_path = "https://image.tmdb.org/t/p/original"+serial.poster_path;


    await insertVideo(serial);

    return new Serial(serial).save()
        .then(() => {
            console.log("Serial "+serial.name+" added");
        })
        .catch(err => {
            return console.error(err.stack);
            console.log("added");
        })
}



async function getAllMovie(){

    console.log("######################################");
    console.log("MOVIES DOWNLOAD");
    console.log("######################################");

    let i = 1 ;

    for (i ; i < 4 ; i++){

        console.log("page : "+i);

        await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=3942737097dcd29145fe000304ac2294&language=fr-FR&page='+i)
            .then(response => {
                let movies = response.data.results;
                return checkMovies(movies);
            })
            .catch(error => {
                console.log(error);
            });
    }
}

async function checkMovies(movies) {
    for(const movie of movies ){

        await Movie.findOne({ id: movie.id })
            .then(res => {
                if(res) {
                    console.log("Movie "+res.title+" already there");
                }else {
                    return insertMovie(movie);
                }
            })

    }
}

async function insertMovie(movie) {
    movie.genre = [];

    for(const id of movie.genre_ids){
        await Genre.findOne({id: id})
            .then(res => {
                if(res){
                    movie.genre.push(res._id);
                }
            })
    }
    movie.backdrop_path = "https://image.tmdb.org/t/p/original"+movie.backdrop_path;
    movie.poster_path = "https://image.tmdb.org/t/p/original"+movie.poster_path;


    await insertVideo(movie);

    return new Movie(movie).save()
        .then(() => {
            console.log("Movie "+movie.title+" added");
        })
        .catch(err => {
            return console.error(err.stack);
        })
}

async function insertVideo(movie) {
    return axios.get('https://api.themoviedb.org/3/movie/'+movie.id+'/videos?api_key=3942737097dcd29145fe000304ac2294&language=fr-FR')
        .then(res => {
            (res.data.results && res.data.results.length > 0) ? movie.video = 'https://www.youtube.com/embed/'+res.data.results[0].key : movie.video = null;
        })
        .catch(error => {
            console.log(error);
        })

}

async function getAllGenre() {

    console.log("######################################");
    console.log("GENRE DOWNLOAD");
    console.log("######################################");

    let genreMovie = new Promise((resolve) => {
        axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=3942737097dcd29145fe000304ac2294&language=fr-FR')
            .then(response => {
                let genres = response.data.genres;
                checkGenres(genres).then(() => {
                    resolve();
                })
            })
            .catch(error => {
                console.log(error);
            });
    });

    let genreSerie = new Promise ((resolve) => {
        axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=3942737097dcd29145fe000304ac2294&language=fr-FR')
            .then(response => {
                let genres = response.data.genres;
                checkGenres(genres).then(() => {
                    resolve();
                })
            })
            .catch(error => {
                console.log(error);
            });
    });

    return Promise.all([genreMovie,genreSerie]);

}

async function checkGenres(genres) {
    for(const genre of genres ){
        await Genre.findOne({ name: genre.name })
            .then(res  => {
                if (res){
                    console.log("Genre "+res.name+" already there");
                } else {
                    insertGenre(genre);
                }
            });
    }
}

async function insertGenre(genre){
    return new Genre({
        id:   genre.id,
        name: genre.name,
    }).save()
        .then(() => {
            console.log("Genre "+genre.name+" added");
        })
        .catch(err => {
            console.error(err.stack);
        })
}

const database = () => {

    console.log("MongoDB url : %s",env.database);
    mongoose.Promise = global.Promise;

    mongoose.connect(env.database,{ useNewUrlParser: true,useCreateIndex: true })
        .then(() => {
            console.log("Successfully connected to MongoDB.");
            initial().then(() => {
                getAllGenre().then(()=>{
                    getAllMovie().then(() => {
                      getAllSerial();
                    })
                });
            });

        })
        .catch(() => {
            console.log('Could not connect to MongoDB.');
            process.exit();
        });
};


module.exports = database;