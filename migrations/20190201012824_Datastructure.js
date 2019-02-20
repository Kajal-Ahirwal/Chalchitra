
exports.up = function(knex, Promise) {
    return Promise.all([
    knex
    .schema
    .createTableIfNotExists( 'eng_movie_data', function( usersTable ) {

        // Primary Key
        usersTable.increments('id').primary();

        // Data
        usersTable.string( 'movie_title', 250 ).notNullable()
        usersTable.string( 'director_name', 50 )
        usersTable.string( 'movie_duration', 25 )
        usersTable.string( 'title_year', 50 )
        usersTable.string( 'movie_genres',250 )
        usersTable.string( 'actor_name',250 )
        usersTable.string( 'movie_link',250 ).notNullable()
        usersTable.string( 'eng_level',250 )


        


        usersTable.timestamp( 'created_at' ).notNullable()
        })
    
    .createTableIfNotExists( 'eng_movie_medium_data', function( usersTable ) {

        // Primary Key
        usersTable.increments();

        // Data
        usersTable.string( 'comment', 1000 )
        usersTable.timestamp( 'created_at' ).notNullable()
        })
    ]);
    
};
exports.down = function(knex, Promise) {
return Promise.all([ knex
    .schema
    
        .dropTableIfExists( 'eng_movie_data' )
        .dropTableIfExists( 'eng_movie_medium_data' )

    ]);


};

  
