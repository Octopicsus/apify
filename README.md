# Apify Fullstack Developer Interview Task

__Read this README thoroughly__!

## Getting Started

This project was created using Node.js v22, and we assume that you will use it (it was created with v22.15.0).
To run the project, you first need to install all dependencies:

```bash
npm install
```

Then, you can run the project with:

```bash
npm run frontend
```

and

```bash
npm run backend
```

## How to Complete the Task

1. Clone this repository.
2. Create a branch named using your name and the year and month, like `jaroslavhejlek202505`.
3. Switch to the branch and follow the `Getting Started` guide.
4. Read through the existing code and note any work that needs to be done (it's marked with TODO comments and also explained below).
5. Start your timer and start working.
6. Plan your work.
7. Complete all the `TODO` comments marked as `LVL1`.
8. When you are finished, stop the timer and record your time.
9. Commit all your uncommitted changes with the commit message: `feat: level 1 done`. If you do not want to continue with `LVL2`, create a pull request.
    - The title should be `<Your name> - <Date>`.
    - In the pull request description:
        - Write how long it took you to finish `LVL1` and optionally how long you spent planning.
        - Add whether you got stuck anywhere and any other information that you feel is important and not clear from the code.
10. Optional: If the `LVL1` TODOs were easy for you and you want to do more, you can continue with the `LVL2` TODOs.
    - Once you are done, create the pull request as described in point 9, but also include how long it took you to complete `LVL2`.

## Requirements and Limitations

- The `TODO` comments marked as `LVL1` are __required__.
- The `TODO` comments marked as `LVL2` are __optional__; do them only after you finish the first level, and you do not have to do all of them.
- The code should be clean and readable.
- The code should pass all ESLint checks.
- The code should pass all tests, including the tests you create yourself. If you did not implement some functionality, remove the tests.
- __You can only install one additional package, either by adding a new package or replacing a package you won't use.__ This is not a hint; it's a limit.
- It's allowed to use AI to help you complete this task. However, be prepared that if you succeed, we will ask you to explain parts of the code and potentially change them, so you must understand what the code does.

We do not want you to spend too much of your time on this task. It's completely fine if you finish just the first level. If you finish only the first level, we will probably ask you how you would solve the second-level task during later steps of the interview process. If you do finish them, we will just review your solution.

The tasks from the second level are there for two reasons:

- You found the first level too easy and want to challenge yourself.
- You are worried you would not work well under pressure during a personal interview and want to show more of your skills while safe at home. :)

## Styling

We currently use `StyledComponents` in Apify. However, in the future, we will probably switch to another styling system. If you do not like it, you can change it to another system before you start your timer, but please note it in the PR description.

## Task Description

> Check the `example-lvl1.mp4` and `example-lvl2.mp4` first to see videos of example solutions. It will hopefully make reading through this description less confusing.

This task is very loosely based on the data from the Advent of Code 2023 Day 3 challenge, which you can find [here](https://adventofcode.com/2023/day/3) if you are interested.

The main goal of this task is to create an app that will visualize data very similar to the data from the challenge.

### Initial State

- The frontend uses a mock `matrix` string in the `useMatrix` hook.
- The backend endpoint does nothing.
- The frontend does two things:
  - Renders the matrix itself as pure HTML:
    - `.` is rendered as an empty cell.
    - The symbols are rendered from the `frontend/src/assets` folder using the `symbolToIcon` helper object.
    - Numbers are left untouched.
  - Renders buttons for each neighborhood, where neighborhoods are cells around a symbol, including the symbol:
    - The button contains only the icon of the symbol.
    - The buttons are disabled.
- There are disabled buttons missing interactivity in the header of the page, indicating filters for each type of neighborhood.
- There is a performance indicator that changes colors if the browser processing thread is blocked for too long.

### Level 1

- The backend endpoint generates an 80x80 2D matrix.
  - Please see the `example.mp4` file to see how the final matrix looks when rendered.
  - The matrix has three types of values:
    - `.` indicates empty space.
    - `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9` are numbers that count towards the value of the neighborhood.
    - `#`, `@`, `$`, `%`, `&`, `*` are symbols that indicate the type of neighborhood.
  - There should be 30% of cells empty, and from the remaining 70% of cells, 90% should be numbers, and the rest symbols.
  - The matrix is returned to the client as a string in a JSON object `{ matrix: '<matrix>' }` with lines delimited by `\n` and cells delimited by spaces.
  - Implement a unit test on the backend that tests if the ratios of the generated cells are correct.
- Style the frontend in any way you want.
- The frontend loads data from the `GET /` endpoint of the backend using `react-query`.
- The neighborhood buttons should, in addition to the icon, also display the value of the neighborhood:
  - The value of the neighborhood is the sum of the numbers in the neighborhood (around the symbol).
- When you click on the neighborhood button, it should visually highlight the neighborhood in the matrix.
  - How it's highlighted visually is up to you.
  - Implement a Cypress test that tests that the neighborhood in the matrix is highlighted after its button is pressed.

### Level 2

- When generating the matrix on the backend, ensure that two neighborhoods never cross.
  - This means that cells from one neighborhood cannot be cells of another neighborhood.
  - Write a test for this functionality.
- Add an option to cache the generated matrix. For this, you need to implement three things:
  - Use a seedable random number generator when creating the matrix (check `backend/lib/random`).
  - Cache the generated matrix in the app controller or in the service.
  - Add tests for this functionality. If you cache it in the controller, create tests for the controller.
- Add an option to highlight a specific type of neighborhood in the matrix and add tests for it.
- Add an option to display borders of the active neighborhood. This adds additional complexity on top of the highlighting from Level 1.

Good luck! :)

## Testing and Linting

Both the frontend and backend have tests and ESLint.
To run ESLint on the whole project, you can run:

```bash
npm run lint
```

To test the whole project, you can run:

```bash
npm run test
```

For the frontend tests to run properly, the frontend of the project needs to be running, but the backend does not have to.

## Other Additional Commands

The commands above use `concurrently` to run the commands on both the frontend and backend. If you want to run them separately, you can use `:backend` or `:frontend` to run them on only one service.

So the commands for the frontend are `npm run lint:frontend` and `npm run test:frontend`. The same can be done for the backend.

There are additional commands available inside the specific folders. Check the `./frontend/package.json` and `./backend/package.json` to see what is available there.
