# Project Movies

## Description
This project is a responsive web application built using Vue.js, Vuex (organized into modules), and the TMDB API. It leverages the power of Vue.js for efficient and dynamic rendering, Vuex modules for well-organized state management, and the TMDB API for fetching and displaying movie data.

The site is designed to be user-friendly and responsive, ensuring a seamless experience across various devices. The layout and styling are achieved using GDID CSS, providing a visually appealing and consistent look.

One of the notable features of this project is the implementation of infinite scroll. Users can effortlessly explore a vast collection of movies as they continuously load when scrolling down, enhancing the browsing experience.

## Technologies Used
- Vue.js: A progressive JavaScript framework for building user interfaces. Vue.js makes it easy to develop interactive and dynamic web applications.


- Vuex: Vuex is used for state management, and the store is organized into modules. This modular approach helps maintain a clean and scalable codebase.


- TMDB API: The project integrates with The Movie Database (TMDB) API to fetch and display movie information. This API provides a vast database of movies, including details such as titles, genres, release dates, and more.


- GDID CSS: A custom styling approach that ensures a responsive and visually appealing design. GDID CSS helps create a consistent and modern look across different screen sizes.


- Font Awesome Icons: Stylish and customizable icons from Font Awesome are used to enhance the visual elements of the application.

## Style Mixins
The project includes style mixins to maintain a modular and organized approach to styling. These mixins can be reused across components, promoting consistency and reducing redundancy in the codebase.

## Vuex Store Modules
The Vuex store is organized into modules, promoting a modular and scalable state management approach. Each module handles a specific aspect of the application's state, making it easier to reason about and maintain. Examples of Vuex modules used in this project include:

1. List Module:
   The Movies module is dedicated to managing the state related to the list of movies. It handles fetching movie data, making it available for components to display.

2. OneMovie Module:
   The OneMovie module is responsible for managing the state related to displaying a popup with detailed information about a single movie. It handles the visibility of the popup and stores information about the selected movie (for example, if a movie is on favorites list).

3. General Module:
   The General module takes care of handling general layout and background-related state. It might include information about the theme, background images, or any other general layout-related details.

These modules follow a modular structure, allowing for a clean separation of concerns and facilitating easier maintenance and extension of the application. Adjust the module structure and state according to your specific requirements.

## FontAwesome Icons
FontAwesome icons are integrated into the project to enhance the visual appeal and provide intuitive symbols for various elements. Icons are used to improve user experience.

## Features
- Infinite Scroll: The application employs infinite scroll, allowing users to explore an extensive list of movies without the need for pagination.

- Responsive Design: The site is designed to adapt seamlessly to various screen sizes, providing an optimal viewing experience on desktops, tablets, and smartphones.

- Movie Details: Users can view detailed information about each movie, including its title, genre, release date, and other relevant details.

# Getting Started

To run this project locally, follow these steps:

### TMDB API
Need to create an account on the site https://www.themoviedb.org/
After it go to settings -> api -> To generate a new API key -> choose developer and accept terms of use -> fill form and submit
Now you have API Key!

Enter to http://dev.travisbell.com/play/v3_auth.html , put Api key and click "Get Request Token" button.
Now save "request_token" and click to "Approve Token".
Need to approve token 3rd Party Authentication Request.

Click to "Get Session ID", save it and let's start use TMDB API!

This post from The movie Database Support very help me: https://www.themoviedb.org/talk/63ecd38e1b729400cd9699da

Need to update config.js file and change API_KEY, SESSION_ID, ACCOUNT_ID.

If your goal is simply to see how the project works, you can ignore creating your account and skip this step. However, keep in mind that the demo account is publicly accessible, and it is only a demonstration of the project's capabilities.

### Clone project

```
https://github.com/Rishon1983/movies.git
```
### Installation
After cloning the project, run the following command in the terminal:
```
npm i
```
### Run in development environment
```
npm run dev
```

If your application doesn't appear after running command line commands, you may need to review if the default port is being used by another application.
Vite uses port 5173 by default.