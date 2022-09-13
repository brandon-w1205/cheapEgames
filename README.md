# cheapEgames

cheapEgames is an application that finds games that are on sale (using CheapShark api) in the genres you love (using RAWG api). 
## Approach

The application utilizes both CheapShark and RAWG api.
By matching the metacritic url featured in both api's, cheapEgames can search for an array of games based on a genre search item with RAWG api and only show the ones that are on sale (by showing the results that match with the metacritic url in CheapShark api).

## Proof of API connection
The metacritic url can be found in both Proof of API connection images below on Postman. 
CheapShark api: 
![image](https://user-images.githubusercontent.com/110140349/189820848-31dd2ee4-f055-45ea-a364-93909c4badd9.png)

RAWG api:
![image](https://user-images.githubusercontent.com/110140349/189822620-f9d0febe-a3d0-4555-8ad9-05cbfc743d4f.png)

## ERD
![image](https://user-images.githubusercontent.com/110140349/189826433-4076f29f-4da3-4c9a-857a-c25b0e51c589.png)

## REST Chart

|method      | action         | description          |
|------------|----------------|----------------------|
|GET         | /user          | shows user information  | 
|POST        | /user/new      | creates a new user   |
|PUT         | /user/:id      | edits specific user  |
|DESTROY     | /user/:id      | Deletes user         |

|method      | action         | description          |
|------------|----------------|----------------------|
|GET         | /searchresults      | shows search results by search index  | 
|POST        | /searchresults/new  | creates search index    |
|PUT         | /searchresults/:id  | updates search index    |
|DESTROY     | /searchresults/:id  | deletes search index   |

|method      | action         | description          |
|------------|----------------|----------------------|
|GET         | /purchased     | shows purchased games| 
|POST        | /purchased/new   | adds purchased games |
|PUT         | /purchased/:id   | edits a purchased game  |
|DESTROY     | /purchased/:id   | deletes a purchased game| 

## Wireframe
![image](https://user-images.githubusercontent.com/110140349/189824570-121f81ae-bfa5-41aa-a424-664897cf6cba.png)

![image](https://user-images.githubusercontent.com/110140349/189824288-6647e53d-f618-4651-9b4e-ea7c7f671a39.png)

![image](https://user-images.githubusercontent.com/110140349/189824961-bc17349c-c51b-4fe8-ab26-da0247d52471.png)


## MVP
* Have a fully functioning HTML and Javascript with controllers
* Have models set up
* Successfully integrate the two API's
* Have a working search system that integrates both API's
* Allow user to search up games by genre
* Allow user to view individual games
* Allow user to edit search results and games purchased
* Allow user to change account info or delete

## User Stories
* As a user, I want to easily navigate to my purchased games
* As a user, I want to find a game on sale
* As a user, I want to find a game that I like
* As a user, I want to be able to use the system without having to log-in

## Stretch Goals
* Proper CSS Styling
* Implement other search results than just genre like games similar to the one you have played before.
