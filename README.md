

# XKCD test project

XKCD is “A webcomic of romance, sarcasm, math, and language” available at https://xkcd.com.

![image1](https://user-images.githubusercontent.com/27861/56590676-16eeb100-65ad-11e9-8a8f-ae9d7f15c331.png)

**Figure 1. Example of XKCD comic**

The goal of this test project is to check your Python and JavaScript skills, requiring you to build a site to manage XKCD comics. XKCD exposes a simple JSON interface, and the details can be seen at https://xkcd.com/json.html. 

The site will allow the creation of users, and the users will be able to insert comics into a database (PostgreSQL is preferred). Use the XKCD interface to get the comic data and store the information.

You need to create two projects, one for the backend and one for the frontend. Backend will provide web services that the frontend can consume.

Both projects should contain deployment instructions (Heroku or Docker based deployments are a bonus). You will provide the code for both projects, forking the original repository. That means you will create two forks (backend and frontend).

Description of backend models and web services as follows (a “*” next to a name means that is required). All bodies and responses must be JSON documents, unless something else is said.

The examples contain MongoDB-like ids, but it is not mandatory to follow that. Numeric ids are also accepted.

## User model
![Screen Shot 2019-04-23 at 11 18 06](https://user-images.githubusercontent.com/27861/56598122-810d5300-65b9-11e9-8e6e-ce09cad36c42.png)


### Methods to be implemented:

**POST /user**

Creates or updates a user.

The password is passed as plain text but must be encrypted when inserted into the database (bcrypt preferred).

 - Example of body:

`{
	"first_name": "Mike",
	"last_name": "Patterson",
	"email": "something@mail.com",
	"password": "secret123"
}`

 - Example of response:

`{
	"status": "200",
	"message": "The user was created successfully",
	"id": "558d6da078fea511752289bd"
}`

When a user is updated the id is required and any parameter can be updated (the id cannot be updated).

 - Example of body:

`{
	"id": "558d6da078fea511752289bd",
	"first_name": "Mike",
	"last_name": "Patterson",
	"email": "something_different@mail.com",
	"password": "secret123"
}`

 - Example of response:

`{
	"status": "200",
	"message": "The user was updated successfully",
	"id": "558d6da078fea511752289bd"
}`
 

 - Example of body:

`{
	"id": "558d6da078fea511752289bd",
	"first_name": "Mike",
	"last_name": "Morris"
}`

 - Example of response:

`{
	"status": "200",
	"message": "The user was updated successfully",
	"id": "558d6da078fea511752289bd"
}`

Will return status different than 200 in case of errors:

 - Examples:

`{
	"status": "400",
	"message": "User with that email already exists"
}`

`{
	"status": "500",
	"message": "Server error"
}`

**POST /user/login**

Logs user into the system

Successful login.

 - Example of body:

`{
	"email": "something@mail.com",
	"password": "secret123"
}`

 - Example of response:

`{
	"status": "200",
	"message": "User logged in successfully"
}`

Failed login.

 - Example of body:

`{
	"email": "something@mail.com",
	"password": "badpassw0rd"
}`

 - Example of response:

`{
	"status": "401",
	"message": "Please check your credentials"
}`

**POST /user/logout**

Logs out current logged in user session

Successful request.  

 - Example of body:

No parameters

 - Example of response:

`{
	"status": "200",
	"message": "User logged out successfully"
}`

## Comic model
![Screen Shot 2019-04-23 at 11 17 00](https://user-images.githubusercontent.com/27861/56598055-58855900-65b9-11e9-83f7-ea4d24de2e63.png)


### Methods to be implemented:

- You will need to create a function "get_comic_metadata(comic_id)", that given a number from 1 to n, being n the last comic (using the XKCD link, without a parameter will bring the current comic (last comic)). The function will obtain the comic metadata from the XKCD interface, this will help with inserting comics.

**POST /comic**

Insert/Update comic

 - Example of body:

`{
	"month": "6",
	"num": 111,
	"link": "",
	"year": 2006,
	"news": "",
	"safe_title": "Firefox and Witchcraft - The Connection?",
	"transcript": "membership in wicca\ntotal firefox downloads\n[[positive slope graph]]\n[[Internet Explorer icon]]\nKeep the Faith\n[[Outline of a cross]]",
	"alt": "ThisadpaidforbythecounciltopromoteMicrosoftandChristianity.  Remember, The Bible is Closed Source.",
	"img": "https://imgs.xkcd.com/comics/firefox_wicca.png",
	"title": "Firefox and Witchcraft - The Connection?",
	"day": "5"
}`

 - Example of response:

`{
	"status": "200",
	"message": "The comic was created successfully",
      "id": "5a453cfd99b423000bc1d554"
}`
 

 - Example of body:

`{
     "id": "5a453cfd99b423000bc1d554",
	"month": "6",
	"num": 111,
	"link": "",
	"year": 2006,
	"news": "",
	"safe_title": "Firefox and Witchcraft - The Connection? (Updated)",
	"transcript": "membership in wicca\ntotal firefox downloads\n[[positive slope graph]]\n[[Internet Explorer icon]]\nKeep the Faith\n[[Outline of a cross]]",
	"alt": "ThisadpaidforbythecounciltopromoteMicrosoftandChristianity.  Remember, The Bible is Closed Source.",
	"img": "https://imgs.xkcd.com/comics/firefox_wicca.png",
	"title": "Firefox and Witchcraft - The Connection? (Updated)",
	"day": "5"
}`

 - Example of response:

`{
	"status": "200",
	"message": "The comic was updated successfully",
      "id": "5a453cfd99b423000bc1d554"
}`

**GET /comic/?tag=<query>**

Returns multiple comics which match the tag parameter, as a case insensitive search in the safe_title and transcript fields. The tag can have whitespace between words. It returns an empty document in case there are no matches.

 - Example of query:

**GET /comic/?tag=firefox**

 - Example of response:

`[
 	{
		"id": "5a453cfd99b423000bc1d555",
		"month": "6",
		"num": 111,
		"link": "",
		"year": 2006,
		"news": "",
		"safe_title": "Firefox and Witchcraft - The Connection?",
		"transcript": "membership in wicca\ntotal firefox downloads\n[[positive slope graph]]\n[[Internet Explorer icon]]\nKeep the Faith\n[[Outline of a cross]]",
		"alt": "ThisadpaidforbythecounciltopromoteMicrosoftandChristianity.  Remember, The Bible is Closed Source.",
		"img": "https://imgs.xkcd.com/comics/firefox_wicca.png",
		"title": "Firefox and Witchcraft - The Connection?",
		"day": "5"
	},
	{
		"id": "5a453cfd99b423000bc1d556",
		"month": "12",
		"num": 1045,
		"link": "",
		"year": 2008,
		"news": "",
		"safe_title": "Web Browsers",
		"transcript": "this is just an example of Chrome and Firefox",
		"title": "Chrome and Firefox",
		"day": "23"
	}
]`

****DELETE /comic/<comic_id>****

Deletes a comic using an id.

 - Example of query:

**DELETE /comic/5a453cfd99b423000bc1d556**

 - Example of response:

`{
	"status": "200",
	"message": "The comic was deleted successfully",
    "id": "5a453cfd99b423000bc1d556"
}`


## Final notes

Not all methods should require authentication, only actions that require creating something in the database should have it (this includes session management).

You are free to design the frontend site as you wish, but at least it should be able to show the comics as images in case the user performs a query (Angular is preferred).

Please send a pull request against the master branch of the upstream repository once you finish the implementation.
