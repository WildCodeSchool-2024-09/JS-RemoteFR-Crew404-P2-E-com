-- SQLBook: Code
create table user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  password varchar(255) not null,
  avatar VARCHAR(255) DEFAULT "/assets/default/avatar.jpg"
);

create table reset_password (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires_at DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
);

# USER : tony@lebg.com / 
insert into user (email, password) values ('tony@lebg.com', "$argon2id$v=19$m=65536,t=3,p=4$XegqmzpC0SQK5Lz9Tsti5Q$eRhyVitXMxgDDsidXyVa/kL+JzRhJXa3phVlEe0TrtU");