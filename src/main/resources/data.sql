INSERT INTO 
	roles (id, name) 
VALUES 
	(1, 'ADMIN'),
	(2, 'USER')
ON CONFLICT (name) 
DO UPDATE SET id = EXCLUDED.id, name = EXCLUDED.name;