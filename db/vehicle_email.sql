select * from vehicles
join users on vehicles.ownerId = users.id
where users.email = $1
