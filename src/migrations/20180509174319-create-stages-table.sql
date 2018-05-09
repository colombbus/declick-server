-- @function up
CREATE TABLE stages (
  id      SERIAL  PRIMARY KEY,
  course  INTEGER REFERENCES courses ON DELETE CASCADE,
  project INTEGER REFERENCES projects ON DELETE CASCADE,
  next    INTEGER REFERENCES stages ON DELETE SET NULL
);
CREATE UNIQUE INDEX ON stages (course, next) WHERE next IS NOT NULL;
CREATE INDEX ON stages (course);

-- @function down
DROP TABLE stages;
