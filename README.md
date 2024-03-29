Live Link: https://cheapegames-brandon-w1205.koyeb.app/

# cheapEgames

cheapEgames is an application that finds games that are on sale (using CheapShark api) in the genres you love (using RAWG api). 

## Approach

The application utilizes both CheapShark and RAWG api.
When the user searches for their favorite genre, the application will call upon RAWG's database to find games within that genre. The games are displayed and when a game is clicked on, it is then found within the RAWG api by ID and in the CheapShark API database. Details from each api are displayed on the page and stored within the database depending on what data is needed.

## Installation Instructions (Without Docker)

1. To use cheapEgames locally, begin by forking and cloning this repository.

2. Afterwards, within the folder and terminal, run the command ```touch .env``` to create an environment file where you will place your following api keys in.

Note: The cheapEgames folder should already have a .gitignore file with '.env' and 'node_modules' written in the file, but if not, go ahead and do so by running the commands ```echo node_modules >> .gitignore``` and ```echo .env >> .gitignore```

3. Within the .env file, add an ENC_KEY variable and assign it a random string as such

```ENC_KEY=['insert random string here without the brackets']```

4. Afterwards, you'll need to grab a key from the RAWG API. Go to the RAWG site here: https://rawg.io/apidocs 
From the site, press "GET API KEY" and sign up with your preferred method. An API key will be sent to your email. Once received, create the following variable with your api key as the value:

```RAWG_Key=[insert RAWG key here without brackets]```

5. Next, open your terminal, go to the locally-cloned repository and run ```npm install``` within the folder

6. Run the following commands to create a database and migrate the models as shown below:
```sequelize db:create```
```sequelize db:migrate```

7. You will now have the following database is psql: "game_db" and will need to run the command
```psql``` to start your database

8. Run ```nodemon``` in the terminal and use the application from your browser with ```localhost:3002``` .

## Installation Instructions (With Docker)

Follow Steps 1-4 from the Installation Instructions (Without Docker) section above.

Then from your terminal, navigate into your local cheapEgames clone folder and run the command ```docker compose up```.

Afterwards, use the application from your browser with ```localhost:3002```.

## Technologies Used

* JavaScript - Node and Express to create the following website foundations
* PostgresQL - Database used to store data
* Sequelize - Allows js to interact with the database
* Bootstrap - CSS framework for styling
* RAWG and CheapShark API's - Video-game databases used to search games and find deals on them

## Proof of API connection
The metacritic url can be found in both Proof of API connection images below on Postman. 
CheapShark api: 
![image](https://user-images.githubusercontent.com/110140349/189820848-31dd2ee4-f055-45ea-a364-93909c4badd9.png)

RAWG api:
![image](https://user-images.githubusercontent.com/110140349/189822620-f9d0febe-a3d0-4555-8ad9-05cbfc743d4f.png)

## ERD
![image](https://user-images.githubusercontent.com/110140349/190029506-87b34e9b-f5ed-43e1-9188-07e8505b7cbb.png)

## REST Chart

User Info
|method      | action         | description          |
|------------|----------------|----------------------|
|GET         | /users          | shows user information along with comments | 
|GET         | /users/new      | form to login        |
|POST        | /users/new      | creates a new user   |
|PUT         | /users/:id      | edits specific user  |
|DESTROY     | /users/:id      | Deletes user         |
|PUT         | /users/:id/:commentid | allows user to edit a comment on the game info |
|DESTROY     | /users/:id/:commentid | allows user to delete a comment on the game info| 

Search Results
|method      | action         | description          |
|------------|----------------|----------------------|
|GET         | /search        | shows initial search page  | 
|POST        | /search/results?=:genre | uses user data to search for games|
|GET         | /search/results?=:genre | displays search results based on genre|

Game Info
|method      | action         | description          |
|------------|----------------|----------------------|
|GET         | /games         | shows all games on sale | 
|GET         | /games/:id     | shows specific game info and comments |
|POST        | /games/:id/:commentid | posts a comment to the game info |
|PUT         | /games/:id/:commentid | edits a comment on the game info |
|DESTROY     | /games/:id/:commentid | deletes a comment on the game info| 

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
* As a user, I want to be able to sign-up or login to see my user information, games I have commented on, and be able to edit my profile
* As a user, I want to search a genre of games that I like
* As a user, I want to receive a list of discounted games based on the genre I selected
* As a user, I want to be able to read the description of said games in list and be able to select the game to read more about it or click a link to be redirected to the website that carries the deal on the game
* As a user, I want to be able to see the full description of the game after clicking on it and be able to read comments made by other users and make a comment of my own about the game

## Stretch Goals
* Proper CSS Styling
* Implement other search results than just genre like games similar to the one you have played before.

## Post-Reflection
I was able to implement a certain amount of styling using Bootstrap; however, I plan on styling it further in the future. Furthermore, I plan on implementing different search ideas, one being to search up games by name. By completing this project, I was able to become more comfortable with databases and how they operate.

## Credit
* Rawg API Database: https://rawg.io/apidocs
* CheapShark API: https://apidocs.cheapshark.com/
