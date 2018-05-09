-- @function up
CREATE TABLE courses (
  id          SERIAL        PRIMARY KEY,
  name        VARCHAR(255)  NOT NULL,
  description VARCHAR(1000) NOT NULL DEFAULT ''
);
CREATE INDEX ON courses (name);

-- @function down
DROP TABLE courses;
