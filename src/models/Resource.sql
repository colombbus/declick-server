-- @function create
-- @params data
-- @returns row
INSERT INTO resources (name, media_type, version, project)
VALUES ($data.name, $data.mediaType, $data.version, $data.project)
RETURNING *;

-- @function getById
-- @params id
-- @returns row
SELECT resources.*, projects.owner
  FROM resources
 WHERE id = $id;
       INNER JOIN projects
       ON projects.id = resources.project

-- @function getAllByProject
-- @params project
-- @returns multiple
SELECT *
  FROM resources
 WHERE project = $project

-- @function existsByName
-- @params name, project
-- @returns field
SELECT COUNT(*) > 0
  FROM resources
 WHERE name = $name
   AND project = $project

-- @function updateById
-- @params id, data
-- @returns row
UPDATE resources
   SET name = COALESCE($data.name, name),
       version = COALESCE($data.version, version)
 WHERE id = $id
RETURNING *;

-- @function destroyById
-- @params id
DELETE
  FROM resources
 WHERE id = $id;
