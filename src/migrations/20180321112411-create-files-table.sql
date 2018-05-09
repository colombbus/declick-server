-- @function up
CREATE TABLE files (
  id         SERIAL       PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  media_type VARCHAR(255) NOT NULL,
  version    INTEGER      NOT NULL
                          DEFAULT 1
                          CHECK (version >= 1),
  project    INTEGER      REFERENCES projects ON DELETE CASCADE
);
CREATE UNIQUE INDEX ON files (project, name);
CREATE INDEX ON files (project);

-- @function down
DROP TABLE files;
