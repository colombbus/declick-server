-- @function create
-- @params data
-- @returns row
INSERT INTO files (name, media_type, version, repo)
VALUES ($data.name, $data.mediaType, $data.version, $data.repo)
RETURNING *;

-- @function getById
-- @params id
-- @returns row
SELECT *
  FROM files
 WHERE id = $id;

-- @function getAllByRepo
-- @params repo
-- @returns multiple
SELECT *
  FROM files
 WHERE repo = $repo

-- @function existsByName
-- @params name, repo
-- @returns field
SELECT COUNT(*) > 0
  FROM files
 WHERE name = $name
   AND repo = $repo

-- @function updateById
-- @params id, data
-- @returns row
UPDATE files
   SET name = COALESCE($data.name, name),
       version = COALESCE($data.version, version)
 WHERE id = $id
RETURNING *;

-- @function destroyById
-- @params id
DELETE
  FROM files
 WHERE id = $id;
