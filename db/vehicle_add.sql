insert into vehicles (make, model, year, ownerId)
values ($1, $2, $3, $4)
returning 'make', 'model', 'year', 'ownerId'
