select count(*) as count from vehicles
join users on vehicles.ownerId = users.id
where users.id = $1
