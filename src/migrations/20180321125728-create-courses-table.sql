-- @function up
CREATE TABLE courses (
  id          SERIAL        PRIMARY KEY,
  name        VARCHAR(255)  NOT NULL,
  description VARCHAR(1000) NOT NULL DEFAULT '',
  config      INTEGER       REFERENCES files ON DELETE SET NULL,
  image       INTEGER       REFERENCES files ON DELETE SET NULL
);

-- @function down
DROP TABLE courses;
