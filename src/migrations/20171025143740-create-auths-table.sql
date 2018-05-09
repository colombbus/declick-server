-- @function up
CREATE TABLE auths (
  token       CHAR(32)  NOT NULL PRIMARY KEY,
  owner       INTEGER   NOT NULL
                        REFERENCES users ON DELETE CASCADE,
  expire_time TIMESTAMP NOT NULL
                        DEFAULT CURRENT_TIMESTAMP + INTERVAL '1 DAY'
);

-- @function down
DROP TABLE auths;
