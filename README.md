# How to run the application:
<p>
To install the application make sure you have node.js installed on your system and node on path. Then in the project root directory run the command:
</p>

### `npm install`

<p>
After installing the necessary node modules you can run the application via first running:
</p>

### `node server.js`

<p>
in one terminal and in another terminal run:
</p>

### `npm start`

# Links to screencasts:
### LiU TDDD27 Project Screencast | På Spårdle
<p>
https://www.youtube.com/watch?v=iDRiYnuT-0o
</p>

### TDDD27, LIU, Individuell Screencast, På Spårdle, Adahy344
<p>
https://www.youtube.com/watch?v=Kr8mZcHLgEM
</p>

### TDDD27, LIU, Individuell Screencast, På Spårdle, Paubl767
<p>
https://www.youtube.com/watch?v=b7Z0etkODok
</p>

# Initial project vision and technological choices
## Functional

<p>
Our vision is to create a website that emulates the popular swedish game show "På spåret". We envision that you can either play by yourself, or against other players, where the winner is decided by who has garnered the most points during a selectable amount of rounds. The game works as followed, the contestants are supposed to guess a location, for example a Swedish city or county. During a round there are different stages, where each stage has a clue and points. These stages gradually give easier clues and fewer points. A contestant is only allowed to make one guess each round, and only one contestant is allowed to guess per stage. 

There is also a round called "Närmast vinner" or closest wins, in which a video is played that is associated with or recorded in a location. During this round the contestants gets to see the video, then they have to select where they believe the location is on a map. The contestant closest to the location wins. 
</p>

<p>
Some core functionalities we want is that users should be able to create accounts. These accounts should be linked to games the user participates in, and allow the user to track their performance on a personal and "global" leaderboard. On the global leaderboard the games with the highest scores and the corresponding user is going to be recorded. As previously mentioned multiple users should be able to participate in games, thus this also has to be supported. 
</p>

## Technological

<p>
For the frontend we selected React and Vite as it allows us to develop the application more efficiently. Additionally, we chose to write in TypeScript instead of JavaScript. TypeScript is a superset of JavaScript that adds optional type checking which can help catch errors and improve code readability/maintainability. Vite offers fast feedback and hot module replacement, which updates the web application dynamically when changed instead of when it is explicitly refreshed. Moreover, Vite is pretty well integrated with React which meant it was easy setting it up.
</p>

<p>
For the back-end we used Django as we have a lot of experience in python. After researching Django we also found that it has many useful features and built-in functionalities. Due to it's popularity we also expect to find a lot of help online. 
</p>

# Final project vision and technological choices

## Functional
<p>
The final product is På-Spårdle, which integrates elements from the popular Swedish game show "På spåret," with some modifications based on our original vision. Currently, the application offers two games. Firstly, På-Spårdle provides users with the opportunity to play the "Classic Game." In this game, users are presented with clues about a city every 10 seconds that gradually become easier, but the points awarded decrease as more clues are given. The user then keeps playing until they guess the wrong city. If the wrong city is guessed then the game is ended, and the user score gets uploaded to a database. The second game is "Closest Wins" and is split into 3 stages: a video stage, a guessing stage, and a correct stage. In the video stage users are presented with a random video presenting some historical event (such as Woodstock or Zlatan Ibrahimovic's famous bicycle kick). The users is then shown a map where they are supposed to pinpoint where the event or thing shown in the video took place. After the user is satisfied with their guess the correct stage is displayed showing the correct location and how far away the user guess was.
</p>

<p>
As mentioned user score for the Classic Game is stored in a database. Your user score can be seen on your Profile page. You can also see all user scores on the Leaderboard page. To see your profile page you need to sign up and login. This part of the application is done using auth0. 
</p>

## Technological

<p>
As for the technological aspect there was some changes as well. We still use React for our frontend, however we remove Vite. This was done because we had issues with incorporating auth0, and when we created a new project without Vite it worked. We also changed from typescript to javascript, since some of our libraries had issues functioning with typescript, and we felt more comfortable coding in javascript. 
</p>

<p>
For the back-end we use Express instead of Django now. This was based on tips from our teacher and a bit more understanding of what we wanted to do with the application.
</p>
