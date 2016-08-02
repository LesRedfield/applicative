# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
first_name      | string    |
last_name       | string    |
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## customers
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
signup          | datetime  | not null, indexed
signup_platform | string    | not null, indexed
signup_channel  | string    | not null, indexed
ab_group        | string    | indexed
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

//a session event is actually a signup event when new_user_session = true

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
