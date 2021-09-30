# README

## Setup
*Make sure you starting in the csv-explorer directory!*

**Backend:**

`bundle install`

`bundle exec rails server`

**Frontend:**

`cd client`

`npm install`

`npm start`

**Browser:**
- Navigate to http://localhost:1337 (if frontend server doesn't automatically do so).

## Directions
1. Upload desired Redfin CSV. Here's the one I used, if needed: [redfin_2021-09-22-11-07-47.csv](https://github.com/griffinsharp/csv-explorer/files/7257005/redfin_2021-09-22-11-07-47.csv). From there, the app should auto-parse and display the csv/table.

2. On the top right of the table, there's a green plus `(+)` and a purple caret `(>)`.

3. The green `(+)` allows the user to add some basic filters, which then display above the table once selected. To clear the applied filter(s), click the `(x)` icon on each filter widget sitting above the table.

4. The purple `(>)` allows the user to toggle between the simple (default) and expanded table views. To view the whole table, click the `(>)` icon. Once expanded, click and hold anywhere on the table. Drag your cursor to the left or right to reveal the rest of the table. 
