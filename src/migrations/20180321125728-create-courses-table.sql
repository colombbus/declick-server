-- @function up
CREATE TABLE courses (
  id          SERIAL       PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  description TEXT         NOT NULL DEFAULT ''
);
CREATE INDEX ON courses (name);

-- @function down
DROP TABLE courses;
