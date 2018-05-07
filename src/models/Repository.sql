-- @function create
-- @params data
-- @returns row
INSERT INTO repos (name, type, description, public, owner)
VALUES (
  $data.name,
  COALESCE($data.type, 'application'::repos_type_enum),
  COALESCE($data.description, ''),
  COALESCE($data.public, FALSE),
  $data.owner
)
RETURNING *;

-- @function getById
-- @params id
-- @returns row
SELECT *
  FROM repos
 WHERE id = $id;

-- @function getRange
-- @params from, count, filters
-- @returns multiple
SELECT *
  FROM repos
 WHERE name = COALESCE($filters.name, name)
   AND type = COALESCE($filters.type, type)
   AND public = COALESCE($filters.public, public)
   AND owner = COALESCE($filters.owner, owner)
OFFSET $from
 LIMIT $count;

-- @function updateById
-- @params id, data
-- @returns row
UPDATE repos
   SET name = COALESCE($data.name, name),
       type = COALESCE($data.type, type),
       description = COALESCE($data.description, description),
       public = COALESCE($data.public, public)
 WHERE id = $id
RETURNING *;

-- @function destroyById
-- @params id
DELETE
  FROM repos
 WHERE id = $id;
