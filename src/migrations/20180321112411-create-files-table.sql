-- @function up
CREATE TABLE files (
  id         SERIAL       PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  media_type VARCHAR(255) NOT NULL,
  version    INTEGER      NOT NULL
                          DEFAULT 1
                          CHECK (version >= 1),
  repo       INTEGER      REFERENCES repos ON DELETE CASCADE
);
CREATE UNIQUE INDEX ON files (repo, name) WHERE repo IS NOT NULL;
CREATE INDEX ON files (repo);

-- @function down
DROP TABLE files;
