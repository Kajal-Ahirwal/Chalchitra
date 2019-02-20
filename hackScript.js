const fs = require('fs');
require('dotenv').config()


var knexfile = require('./knexfile.js');
var knex = require('knex')(knexfile.development);

const tableName = 'eng_movie_data';

const getPromises = (rows) => {
    return rows.map((row) => 
    new Promise((resolve, reject)=> {
        knex(tableName).count('id as a').where({"movie_title":row["movie_title"]}).then((count)=>{
            if (count[0].a==0) {
                knex(tableName).insert(row)
                .then((row) => {
                    resolve("inserted");
                });
            } else {
                console.log("not insert", row)
                resolve("need not insert");
            }
        })
    })
  );
};
const callPromises = (rows) => {
    first_1000_rows = rows.slice(0,1000);
    promises = getPromises(first_1000_rows);
    remaining_rows = rows.slice(1000, rows.length);

    Promise.all(promises)
    .then((data) =>
        {
            console.log("remaining ", remaining_rows.length);

            if (remaining_rows.length === 0)
                process.exit(1);
            else
                callPromises(remaining_rows);
        })
    .catch((error) => {
        console.log(error ,"errrr");
        process.exit();
    });
}

fs.readFile('movie_data.csv', function (err, data) {
    if (err) throw err;
    let eng_movie_data = data.toString().split("\n")
    let rows = [];
    let len=eng_movie_data.length
    for (let i = 0; i < len; i++) {
      const element = eng_movie_data[i];
      let eng_learning = element.split(',');
      let name_of_movie =eng_learning[11]
      let name_of_director=eng_learning[1]
      let duration_of_the_movie=eng_learning[3]
      let genres_of_the_movie = eng_learning[9]
      let title_year = eng_learning[23]
      let actor_name = eng_learning[6]
      let link_of_movie = eng_learning[17]
      rows.push({ "movie_title": name_of_movie,"director_name":name_of_director,"movie_duration":duration_of_the_movie ,"title_year":title_year,"movie_genres":genres_of_the_movie,"actor_name":actor_name,"movie_link": link_of_movie})
    }
    callPromises(rows);

 });