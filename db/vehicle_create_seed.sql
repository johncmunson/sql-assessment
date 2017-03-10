-- It may be helpful to drop and reinstantilize the table when doing
-- the tests in case you delete users/cars the tests are expecting to see
-- DROP TABLE IF EXISTS vehicles;

drop table if exists vehicles;

create table vehicles (
    id serial primary key,
    make varchar(20),
    model varchar(20),
    year integer,
    ownerId integer references users(id)
);

insert into vehicles (make, model, year, ownerId)
values ('Toyota', 'Camry', 1991, 1),
('Honda', 'Civic', 1995, 1),
('Ford', 'Focus', 2005, 1),
('Ford', 'Taurus', 2003, 2),
('VW', 'Bug', 2010, 2),
('Mini', 'Coup', 2013, 3);
