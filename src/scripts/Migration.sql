-- @function createTable
CREATE TABLE IF NOT EXISTS migrations (
  name TEXT PRIMARY KEY
)

-- @function log
-- @params name
INSERT INTO migrations (name)
VALUES ($name)

-- @function getAll
-- @returns multiple
SELECT name
  FROM migrations

-- @function unlog
-- @params name
DELETE
  FROM migrations
 WHERE name = $name
