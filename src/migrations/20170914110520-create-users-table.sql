-- @function up
CREATE TYPE users_role_enum
            AS ENUM('user', 'admin');
CREATE TABLE users (
  id            SERIAL          PRIMARY KEY,
  username      VARCHAR(20)     NOT NULL UNIQUE,
  email         VARCHAR(254),
  password_hash CHAR(60)        NOT NULL,
  role          users_role_enum NOT NULL DEFAULT 'user'
);

-- @function down
DROP TABLE users;
DROP TYPE users_role_enum;
