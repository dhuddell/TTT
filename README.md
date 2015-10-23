# Ticky-Tacky? Totes!
## A simple classic -- Tic-Tic-Toe
## *Now with rhyming!*

#### This project is a server-supported front-end Tic-Tic-Toe interface.

##Landing Page

Register form communicates with private server thought AJAX.
Login form communicates with private server thought AJAX.
Forms and landing div handled intuitively with JQuery.

##Game Choice

#####Local game functionality -- two local players:
  -Start game: initializes a new game with unique game ID on server, and activates game board.

  -Join game: re-enters a previously initialized game using game ID, loads all previous moves and activates game board to proper turn order.

#####Remote game functionality -- one local player:
  -Start game: initializes a new game with unique game ID on server, activates event listener for changes from server and activates game board.

  -Join game: enters a previously initialized game using game ID(as 'O' player), loads all previous moves, activates event listener for changes from server, and activates game board to proper turn order.

##Game Play


Functioning win/loss/tie conditions handlers.

Moves registered through respective div's click handlers.

Intuitive navigation flow using Jquery.

All API functions are integrated directly into from-scratch HTML.

Win counters for X and O update after each win condition is reached.


##Achieved Goals


Custom CSS and Jquery provide a neat, minimalist, and responsive design.

There are functional rhymes on every part of the page.

Integrated a custom lightweight grid framework based on elements of Skeleton and Bootstrap.

Organized code to separate concerns and compartmentalize functional responsibilities.

In-layout banner updates used to the current game state and their options.
