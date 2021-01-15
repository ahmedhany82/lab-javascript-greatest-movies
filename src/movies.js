// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors. How could you "clean" a bit this array and make it unified (without duplicates)? 

function getAllDirectors(movies) {

    const directorsArray = movies.map(function(movie) {
        return movie.director;
    })
    const uniqueDirectors = [...new Set(directorsArray)];
    return uniqueDirectors;
}


// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?

function howManyMovies(movies) {

    const spielbergMovies = movies.filter(function(movie) {
        return ((movie.director === 'Steven Spielberg') && (movie.genre.indexOf('Drama') !== -1));
    })
    return spielbergMovies.length;
}

// Iteration 3: All rates average - Get the average of all rates with 2 decimals

function ratesAverage(movies) {

    if(movies.length === 0) {
        return 0;
    }

    const rateSum = movies.reduce(function(acc, movie) {
        if(movie !== {} && movie.rate !== '' && ('rate' in movie)) {
            return acc + movie.rate;    
        }
        else
        {
            return acc + 0;
        }
    },0)
    return Number((rateSum/movies.length).toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies

function dramaMoviesRate(movies) {

    const dramaMovies = movies.filter(function(movie) {
        return ((movie.genre.indexOf('Drama') !== -1));
    })

    return ratesAverage(dramaMovies);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)

function orderByYear(movies) {

    if(movies.length === 0) {
        return [];
    }
    const sorted = movies.sort(function(movie1, movie2) {
        if (movie1.year > movie2.year) {
            return 1;
        }
        if (movie1.year < movie2.year) {
            return -1;
        }
        if (movie1.year === movie2.year) {
            return (movie1.title.localeCompare(movie2.title));
        }
    })
    return sorted;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles

function orderAlphabetically(movies) {
    
    const dummyarray = movies.slice();
    const sorted = dummyarray.sort(function(movie1, movie2) {
        return (movie1.title.localeCompare(movie2.title));
    })
    const first20Movies = sorted.slice(0,20);

    const titles = first20Movies.map(function(movie) {
        return movie.title;
    })

    return titles;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes

function turnHoursToMinutes(movies) {
        const result = movies.map(function(movie) {
        const durationStr = movie.duration;
        const durationdigits = durationStr.split(" ");
        let durationMinutes = 0;

        if(durationdigits.length > 1)
        {
            const hours = durationdigits[0].slice(0,-1);
            const minutes = durationdigits[1].slice(0, -3);
    
            durationMinutes = (Number(hours) * 60) + Number(minutes);    
        }
        else {
            if(durationdigits[0].slice(-1) === 'h')
            {
                durationMinutes = (Number(durationdigits[0].slice(0,-1)) * 60);
            }
            else
            {
                durationMinutes = Number(durationdigits[0].slice(0, -3));
            }
        }
        const newObj = {...movie, duration: durationMinutes};
        return newObj;
    })

    return result;
}

// BONUS - Iteration 8: Best yearly rate average - Best yearly rate average

function bestYearAvg(movies) {

    if(movies.length === 0) {
        return null;
    }
    
    /* create an array of all the years */
    let yearsArray = movies.map(function(movie) {
        return movie.year;
    })

    /* remove duplicates */
    yearsArray = [...new Set(yearsArray)];

    /* create an object with property: year and value: average rating */
    const yearRate = {}

    for(year of yearsArray) {
      /* create a separate array of movies per year */
      let yearMovies = movies.filter(function(movie) {
        return (movie.year === year)
      })
      /* calculate the average per year */
      yearRate[year] = ratesAverage(yearMovies);
    }

    /* find max average rating */
    let maxAvgRate = 0;
    let bestYear = '';
    for(let year in yearRate) {
      if(yearRate[year] > maxAvgRate) {
        maxAvgRate = yearRate[year];
        bestYear = year;
      }
    }

    let str = 'The best year was ' + bestYear + ' with an average rate of ' + maxAvgRate;
    return str;
}