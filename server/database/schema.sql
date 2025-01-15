create table user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  password varchar(255) not null
);

insert into user (email, password) values ('tony@lebg.com', "password");