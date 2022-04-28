CREATE TABLE employees (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    first_name TEXT NOT NULL,
    middle_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    commission_num INTEGER NOT NULL,
    work_email TEXT NOT NULL,
    mobile_number BIGINT NOT NULL,
    password TEXT NOT NULL
);