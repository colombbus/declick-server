-- @function up
CREATE TABLE results (
  id    SERIAL  PRIMARY KEY,
  user  INTEGER NOT NULL
                REFERENCES users ON DELETE CASCADE,
  score INTEGER NOT NULL,
                CHECK(score >= 0 AND score <= 100),
  data  JSON    NOT NULL
);

-- @function down
DROP TABLE results;
