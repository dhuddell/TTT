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

_Functioning win/loss/tie conditions handlers.
_Moves registered through respective div's click handlers.
_Intuitive navigation flow using Jquery.
_All API functions are integrated directly into from-scratch HTML.
_Win counters for X and O update after each win condition is reached.


##Achieved Goals

_Custom CSS and Jquery provide a neat, minimalist, and responsive design.
_There are functional rhymes on every part of the page.
_Integrated a custom lightweight grid framework based on elements of Skeleton and Bootstrap.
_Organized code to separate concerns and compartmentalize functional responsibilities.
_In-layout banner updates used to the current game state and their options.
