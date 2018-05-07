-- @function up
CREATE TYPE repos_type_enum
            AS ENUM('application', 'challenge', 'component');
CREATE TABLE repos (
  id          SERIAL          PRIMARY KEY,
  name        VARCHAR(255)    NOT NULL,
  type        repos_type_enum NOT NULL
                              DEFAULT 'application',
  description VARCHAR(1000)   NOT NULL DEFAULT '',
  public      BOOLEAN         NOT NULL DEFAULT FALSE,
  owner       INTEGER         NOT NULL
                              REFERENCES users ON DELETE CASCADE
);
CREATE INDEX ON repos (name);
CREATE INDEX ON repos (owner);

-- @function down
DROP TABLE repos;
DROP TYPE repos_type_enum;
