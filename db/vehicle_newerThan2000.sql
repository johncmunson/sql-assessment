select * from vehicles
join users on vehicles.ownerId = users.id
where vehicles.year > 2000
order by vehicles.year desc
