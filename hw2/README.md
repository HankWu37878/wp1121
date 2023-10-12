# Web Programming Hw2 WP Music
Actually, the whole set up steps is the same as the 112-1-unit1-trello-clone, except for the `.env` file(`PORT = 3000`).

## Add `.env` file in the backend folder
- In `/backend` directory, create a file named `.env`
- Add some lines in `.env`
  ```bash
  PORT=3000
  MONGO_URL=<your connection string>
  ```
- After yarn start in the backend folder
  If successful, you should see the following message in the terminal:
  ```bash
  Server is running on port http://localhost:3000
  ```


## Implementation for perfect
I've done the first and second requirements of perfect, which are the alert some messages for users using a pop-up window when they do something wrong, and check if there're already exist before adding playlists and songs.

- For the first requirement: the pop up window
  You can try to do something wrong, such as create a playlist without name or description, there will be a pop-up window remind you filling the missing information.
  
- For the second requirement: check if the playlists or songs already existed before creating new ones
  You can try to add a song or playlist which already existed in the data, then there will be a pop up window(first requirement) remind you of that.

If there's any question about my hw2, please contact hankwu1222@gmail.com, thanks.

  

