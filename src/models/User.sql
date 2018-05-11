-- @function create
-- @params data
-- @returns row
INSERT INTO users (username, email, password_hash)
VALUES ($data.username, $data.email, $data.passwordHash)
RETURNING *;

-- @function getById
-- @params id
-- @returns row
SELECT *
  FROM users
 WHERE id = $id;

-- @function getByUsername
-- @params username
-- @returns row
SELECT *
  FROM users
 WHERE username = $username;

-- @function getByToken
-- @params token
-- @returns row
SELECT *
  FROM users
       INNER JOIN auths
       ON auths.owner = users.id
          AND auths.token = $token
          AND (auths.expire_time IS NULL
              OR auths.expire_time > CURRENT_TIMESTAMP);

-- @function getRange
-- @params from, count
-- @returns multiple
SELECT *
  FROM users
OFFSET $from
 LIMIT $count;

-- @function existsByUsername
-- @params username
-- @returns field
SELECT COUNT(*) > 0
  FROM users
 WHERE username = $username;

-- @function updateById
-- @params id, data
-- @returns row
UPDATE users
   SET email = COALESCE($data.email, email),
       password_hash = COALESCE($data.passwordHash, password_hash)
 WHERE id = $id
RETURNING *;

-- @function destroyById
-- @params id
DELETE
  FROM users
 WHERE id = $id;
