# Buzz Social

## Table of Contents
- [Intro](#intro)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Local Installation](#local-installation)

## Intro
Welcome to Buzz Social, my first portfolio project! a social media website with many cool features.

## Tech Stack
Buzz Social is built using the following technologies and frameworks:
- **Front-end**: React.js, Tailwind Css
- **Back-end**: Sanity.io - A CMS (=Content Management System) that allows for easy content management and structuring, perfect for a content-driven website like Buzz Social.
- **Database**: Sanity.io + GROQ (=Graph-Relational Object Queries) *GROQ is Sanity's unique query language
- **Authentication**: Google Oauth + JWT (=JSON Web Tokens)
- **Routing**: React Router

## Features
- **User Authentication**: Easily log in with your google account.
- **Posts Feed**: Feed displaying posts from people around the world. Save, download & comment on posts.
- **Post Creation**: Create and publish your own post with a title, about section, link to a relevant source for further knowledge & select the relevant category.
- **Explore**: Discover new categories and users based on your interests. Browse by categories on the side menu.
- **Search**: Search for a specific post by it's category/title/about section.
- **User Profile**: View all posts created by you and all posts saved by you.

## Installation
To install and run Buzz Social locally, follow these steps:

1. Clone the repository:
```
$ git clone https://github.com/RoyTennenbaum/buzzSocial.git
```
2. Navigate to the project directory (to the frontend folder):
```
$ cd buzzSocial
$ cd frontend
```
3. Install the required dependencies:
```
$ npm i
```
4. Set up the environment variables:
- Create a `.env` file in the frontend root directory.
- Define the following variables:
  ```
  REACT_APP_GOOGLE_API_TOKEN = ^create on google cloud, follow instructions there^
  REACT_APP_SANITY_PROJECT_ID = ^create an account on sanity and then create a project there, name it Buzz Social or however you like^
  REACT_APP_SANITY_TOKEN = ^same as above^
  ```
5. Run the app:
```
$ npm start
```
