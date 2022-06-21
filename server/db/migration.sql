DROP TABLE IF EXISTS Users;

CREATE TABLE Users(
   user_id SERIAL PRIMARY KEY NOT NULL,
   user_name CHAR(50) NOT NULL,
   password CHAR(50) NOT NULL   
);

DROP TABLE IF EXISTS top_ten;

CREATE TABLE Favorites(
   id SERIAL PRIMARY KEY NOT NULL,
   user_id INT NOT NULL,
   meal_id CHAR(32) NOT NULL
);

DROP TABLE IF EXISTS Meals;