-- @function up
CREATE TABLE example (
  id SERIAL PRIMARY KEY
);

-- @function down
DROP TABLE example;
