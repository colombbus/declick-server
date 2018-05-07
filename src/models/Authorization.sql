-- @function create
-- @params token, owner
-- @returns row
INSERT INTO auths (token, owner)
VALUES ($token, $owner)
RETURNING *;

-- @function destroyByToken
-- @params token
DELETE
  FROM auths
 WHERE token = $token;
