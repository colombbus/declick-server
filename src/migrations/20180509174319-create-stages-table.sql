-- @function up
CREATE TABLE stages (
  id      SERIAL  PRIMARY KEY,
  course  INTEGER NOT NULL
                  REFERENCES courses ON DELETE CASCADE,
  project INTEGER NOT NULL
                  REFERENCES projects ON DELETE CASCADE,
  next    INTEGER REFERENCES stages
);
CREATE UNIQUE INDEX ON stages (course, next) DEFERRABLE INITIALLY DEFERRED
CREATE INDEX ON stages (course);

-- @function down
DROP TABLE stages;
