const Boom = require('boom');
const knex = require('./knex')

module.exports = [
	{
		method: 'GET',
		path: '/get_movie_of',
		config: {
			description: 'get word of the day',
			notes: 'get word of the day',
			tags: ['api']
		},
		handler: (request, h) => {
			
			const query=request.query;
			let number=50;
			let pr = (resolve, reject) => {
				knex("eng_movie_data")
				.where('movie_title','like','%'+query.movie+'%')
				.select("movie_title","director_name","movie_duration","title_year","movie_genres","actor_name","movie_link","eng_level")
				.then((result1) => {
					console.log(result1)
				return resolve(result1.slice(0,number))
				
				// else if(page_number!==""){
				// 	let start=parseInt(page_number)*number
				// 	return resolve(result1.slice(start,start+number))

				// }
				
			})
				.catch((error) =>{
					return reject(Boom.forbidden(error))
				})
					
					
			}
			return new Promise(pr)
		}
	},

	{
		method: 'POST',
		path: '/get_movie_of',
		config: {
			description: 'post information',
			notes: 'post movie of the data',
			tags: ['api']
		},
		handler: (request, h) => {
			let pr = (resolve, reject) => {
		
				let final_response=[]
				//console.log(query.sentence)
				knex("eng_movie_data").where({"movie_title":request.payload.movie_title}).insert({
					eng_level: request.payload.eng_level,
					
				})
				
				.then((result1) => {

					return resolve("Successfully Posted.")


				})
				.catch((error) =>{
					return reject(Boom.forbidden(error))
				})
					
					
			}
			return new Promise(pr)
		}
	},
	{
		method: 'POST',
		path: '/get_comment_of',
		config: {
			description: 'comment information',
			notes: 'post comment of the data',
			tags: ['api']
		},
		handler: (request, h) => {
			let pr = (resolve, reject) => {
		
				let final_response=[]
				//console.log(query.sentence)
				knex("eng_movie_medium_data").insert({
					comment: request.payload.comment,
					
				})
				
				.then((result1) => {

					return resolve("Successfully Posted.")


				})
				.catch((error) =>{
					return reject(Boom.forbidden(error))
				})
					
					
			}
			return new Promise(pr)
		}
	},
	{
        method: 'GET',
        path:'/comment',
        handler:async(request,h)=>{
            let pr = (resolve,reject) => {
                knex("eng_movie_medium_data").select("comment")
                    .then((result)=>{
                        return resolve(h.response(result));
                    })
                    .catch((error)=>{
                        //console.log(error);
                        return reject(h.response(error));
                    });
            }
            return new Promise(pr);
        }
        
    },
   
	
]
