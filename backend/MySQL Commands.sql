CREATE DATABASE SocialNetwork;
USE SocialNetwork;7

-- Create tables

CREATE TABLE User (
  Email varchar(50) PRIMARY KEY,
  FirstName varchar(50) NOT NULL,
  LastName varchar(50) NOT NULL,
  Nickname varchar(50),
  Password varchar(200) NOT NULL,
  Phone varchar(15),
  Gender boolean NOT NULL,
  Birthdate datetime not null,
  ProfilePic blob,
  Hometown varchar(50),
  MaritalStatus varchar(50),
  AboutMe mediumtext
);

CREATE TABLE Friendship (
  User1 varchar(50) NOT NULL,
  User2 varchar(50) NOT NULL,
  Status boolean NOT NULL,
  PRIMARY KEY (User1, User2),
  FOREIGN KEY (User1) REFERENCES User(Email),
  FOREIGN KEY (User2) REFERENCES User(Email)
)

