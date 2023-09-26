# Web Programming Hw1 My Diary
Actually, the whole set up steps is the same as the 112-1-unit1-todo-list, except for the `.env` file(`PORT = 7000`), and I use fetch method instead of axios.


## Add `.env` file in the backend folder
- In `/backend` directory, create a file named `.env`
- Add some lines in `.env`
  ```bash
  PORT=7000
  MONGO_URL=<your connection string>
  ```
- After yarn start in the backend folder
  If successful, you should see the following message in the terminal:
  ```bash
  Server is running on port http://localhost:7000
  ```


## Basic functions for My Diary (pass)
- The button at the top-right corner of the front page has a button `新增日記本`, press it and it will pop up a window which is the `edit mode`.
- Every cancel button is at the top-left corner of the pop up windows, which is a red button with `X` on it.
- In the `edit mode`, there's some basic content to fill up, if not, it will alert messages to tell you do it.
- After pressing `save` button at the bottom of the window to add new diary, it will go back to `browse mode` and the new diary card will appear on the front page.
- Clicking on those diary cards on the front page, it will pop up a window with the details of that diary card, which is the `browse mode`.
- And, there's an `edit` button at the buttom of the pop up window, click it and it will go back to the `edit mode` to let the user make some change to the content of the card.



## Implementation for perfect
I've done the first and second requirements of perfect, which are the filter function and checking invalid date.

- For the first requirement: the filter function
  
  You can see at the top-left corner of the front page, there's a white button, when you press it, it will pop up a selector of 7 labels (none and the six labels), choose one and click the check button on the right, the filter function will work and show the filtered diary cards in the front page.

- For the second requirement: checking invalid date

  When you add a new diary, you can see that the input of the date is a date selector instead of a string, using this method can prevent invalid date appearing in the diary cards since there's no invalis date in the date selector.

- Another implementaion for completeness: the preview of each diary card

  You can easily see that, on the diary cards, there are preview for the content.


  

