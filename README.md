# ABOUT Battleship

Client module of web application BattleShip
Battleship is a guessing game for two players. It is played on ruled grids on which each player's fleet of ships are marked.
The locations of the fleets are concealed from the other player. Players alternate turns calling "shots" at the other player's ships, 
and the objective of the game is to destroy the opposing player's fleet.


### PREREQUISITES

* node v11.14.0
* npm 6.9.0
* Angular: 6.1.9 
 
### RUNNING

Client server url: https://wkbp-battleships.herokuapp.com/

Local run: 
* npm install
* ng serve -o

Apllication runs on port 4200

Production run:
* ng build --aot --prod
* node server.js

 Apllication runs on port 8080

 ### Backend

 Backend server url: https://battleship-wkbp-server.herokuapp.com/
 
 Backend repository url: https://github.com/ksundaysky/battleship


### BONUSES
 
Patryk Kucharski 15.04 odpowiedzi - scrum

### SETTING UP THE GAME

Signing up & Signing in

In order to play the game one needs to be created. We can either join game created by another user or make our own. But before such actions are made we need to be signed in. Making an account is fairly simple, head over to the Register section on the navigation bar at the top of site. Once in there will be register form waiting to be filled. If that was done properly, check in “I agree to terms and conditions” box, then click “Register” button. If everything was filled correctly you will be redirected to login form. Signing in will move us back to homepage, where all currently running games are listed. 

Homepage

Now you have access to “Create game” bar, also you are able to join any game that is in “Waiting for player” state. Each game will be in one of four states which are as follows:

Waiting for opponent - means that game is waiting for another player to join in.
In progress - means that game already has 2 players, who already started to play.
Finished - means that players are finished playing and are now looking at game summary screen. 
Aborted - means that game was interrupted and finished prematurely by one of the players.

Setting up our own game

Creating our own game is pretty simple. Click “Create game” bar and fill up game form. It will define game name, rules and starting player. After you do so “create game” button will appear. Click on it in order to move to ship placement section. Once there you will see your board and “Randomize fleet” button. At this point game is already created with a “Waiting for opponent” state and other players can join it anytime. Now it’s time for placing your ships on the board. When second player joins the game he will be placing his own fleet simultaneously. After you are done, click “Ready” button. If clicked by both players the game will start automatically. To continue from now on head over to the “Game rules & How to play” section. 


### GAME RULES & HOW TO PLAY

WKBP Battleships rules manual

“Battleships” is a guessing, turn-based game for 2 players. It is played on square boards divided by grid, the goal is to shoot down enemy fleet before he does so with ours. The very essence of the game is fact that position of enemy ships is concealed, so in order to win good guesses and sometimes bit of luck will be needed. 

Basic game components

Main game components are two identical boards with given dimensions which are corresponding to second players boards. Most of gameplay will take place on those. Left board contains our fleet, while right - fleet of the opponent. Rows on boards are described by capital letters, while each column has its own unique number. Board with our fleet (leftone) is not interactive and serves mainly as information about opponent’s actions. Our moves will be marked on board signed as “Opponent’s board”. To fire at chosen field hover cursor over it and click left mouse button (or tap it while playing on touch-interface device). 


Right below boards there’s a text window holding live transcript of the game. Every move made will be displayed along with date, player who made it and it’s outcome. 

Fleet

Both players have exactly the same fleet. Standard one consists of 10 ships:

1 ship with length of 4 fields
2 ships with length of 3 fields
3 ships with length of 2 fields
4 ships with length of 1 field

Each of ships is a rectangle with dimensions 1 field x length of ship.

Shoot outcome

Depending on shoot outcome fields will change its state and colour. Red means that shoot has missed the target and there’s no enemy ship on given field. Green means enemy ship has been hit. Each ship from our fleet placed on the left board is marked with grey colour. X symbol on such a ship means, that it was hit by the enemy.

		

Left board - view of our fleet		      		Right board - view of enemy’s board and
                                                                                                 shots fired at his fleet 


Fleet placement

Before the actual games begins, each player randoms placement of his fleet on board. According to rules of placing the ships they can’t “touch” each others, which is worthy remembering throughout the game. Randomizing can be repeated until output is satisfying. When we are ready and fleet is placed on board click “Ready” button. Then we need to wait for our opponent to do the same. If both players are done and ready game will be started automatically. 

Gameplay

Game is turn-based, information about who has a turn currently is displayed in the middle of screen just above boards. While turn is his, player fires at chosen field. If shoot missed turns are switched and it’s time for our opponent to make his move. If shoot indeed hit a ship player receives another turn, he will continue to do so until he misses. Then again turn will be handled to the first player. This means that it is possible for a player that starts to sink whole enemy fleet without handling turn to his opponent (if one is lucky enough). Ship which is hit but still has remaining non-hit fields is treated as hit-but-not-sunken. One that has its all fields hit is treated as hit-and-sunken, which means that according to previous mentioned rules there are no ships on neighbour fields. Game will detect sunken ships and will mark all neighbouring fields with red colour.        
	           		

Shooting at field marked as red will handle turn to the opponent, but shooting at already hit or sunken ship will not. Once a player sunk all ships of enemy’s fleet he wins, and the game ends. Then both players are shown game summary containing game data and players statistics. 



Developing team WKBP wishes you a pleasant gaming experience!
