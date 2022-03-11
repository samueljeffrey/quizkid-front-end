# My Quizkid React App

---

## Description

This project has been to develop a front end app for a quiz website, with its functionality facilitated by my own backend API, which I built prior to this.

---

## Try the React App

#### The hosted React App can be found here: https://samuel-jeffrey-quizkid.netlify.app/.

#### The API which I created and used for this project is found here: https://samueljeffrey-quizkid.herokuapp.com/api. Its Github repository can be found here: https://github.com/samueljeffrey/samueljeffrey-quizkid.

---

## Check out the project for yourself

### 1. Clone the repository

In your terminal, when in your chosen directory, run the following command:

```http
git clone https://github.com/samueljeffrey/quizkid-front-end.git
```

Once cloned, enter the new directory and open it in your editor, via the following commands in the terminal:

```http
cd quizkid-front-end
code .
```

---

### 2. Install dependencies

You'll first need to make sure that your code editor has a minimum of Node version v16.0.0 installed. In order to install react, which enables you to run the project from a local server within your computer, type the following commands into your code editor's terminal:

```http
npm install
```

---

### 3. Try the app

To run and use the app with all its functionality, from a local server, simply run the following command in your computer:

```http
npm start
```

A new window will open up and you can explore the app from there.

The app has the following functionality:

- Users can view a list of quizzes to play on the homepage, sorted by most recent first, and can also filter by category.
- Upon clicking on a quiz from the list, users are navigated to its page, where the basic details and instructions are shown.
- When pressing play, the text input field, current score and give up button are displayed, with the quiz table below.
- Users type text into the input field and upon a match to any accepted answer for any question, the text disappears and the question's answer is shown in green in the quiz table below.
- The quiz ends either when the timer reaches zero, or when the user presses the give up button. The user's score is then shown, along with the average score for that quiz, and a patch request is made, which increment the number of plays and sets the new average score.
- Users can also navigate to the create page through the header. Here, a detailed list of instructions is first displayed.
- The user can enter the main details for the quiz, and then add up to 100 questions with multiple accepted answers.
- As long as all required fields are filled, including in all added questions, the create quiz button will trigger a post request to the API with the quiz information, and upon receiving the response, the page will show a button with a link to the newly posted quiz.

#### Thanks for having a look at my React App
