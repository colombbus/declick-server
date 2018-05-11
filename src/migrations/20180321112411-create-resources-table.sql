-- @function up
CREATE TABLE resources (
  id         SERIAL       PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  media_type VARCHAR(255) NOT NULL,
  version    INTEGER      NOT NULL
                          DEFAULT 1
                          CHECK (version >= 1),
  project    INTEGER      NOT NULL
                          REFERENCES projects ON DELETE CASCADE
);
CREATE UNIQUE INDEX ON resources (project, name);
CREATE INDEX ON resources (project);

-- @function down
DROP TABLE resources;
