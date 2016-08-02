# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## customers
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
signup          | datetime  | not null, indexed
signup_platform | string    | not null, indexed
signup_channel  | string    | not null, indexed
ab_group        | string    | not null, indexed
age             | integer   | not null, indexed
gender          | boolean   | not null, indexed

## events
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
customer_id     | integer   | not null, foreign key (references customers), indexed
new_user_session| boolean   | not null, indexed
session_platform| string    | not null, indexed
session         | datetime  | not null, indexed
cart_add        | datetime  | indexed
checkout        | datetime  | indexed
purchase        | datetime  | indexed

//is it ok to also store customer signup datetime in the events table, since it
//is an event itself? or just go through the FK every time i access signup, even
//as an event?

## annotations
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key (references customers), indexed
data_point      | string    | not null, indexed
title           | string    |
body            | text      |

## tags
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
annotation_id   | integer   | not null, foreign key (references annotations), indexed
user_id         | integer   | not null, foreign key (references users), indexed
