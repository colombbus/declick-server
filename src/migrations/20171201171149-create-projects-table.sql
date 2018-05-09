-- @function up
CREATE TYPE project_type_enum
            AS ENUM('application', 'challenge');
CREATE TABLE project (
  id          SERIAL            PRIMARY KEY,
  name        VARCHAR(255)      NOT NULL,
  type        project_type_enum NOT NULL DEFAULT 'application',
  description VARCHAR(1000)     NOT NULL DEFAULT '',
  public      BOOLEAN           NOT NULL DEFAULT FALSE,
  owner       INTEGER           NOT NULL
                                REFERENCES users ON DELETE CASCADE
);
CREATE INDEX ON project (name);
CREATE INDEX ON project (owner);

-- @function down
DROP TABLE project;
DROP TYPE project_type_enum;
