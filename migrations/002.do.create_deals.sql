CREATE TABLE deals (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    type TEXT NOT NULL,
    year INTEGER NOT NULL,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    trim TEXT NOT NULL,
    vin TEXT NOT NULL,
    arrival_start TIMESTAMP,
    arrival_end TIMESTAMP,
    trade_in BOOLEAN DEFAULT FALSE NOT NULL,
    trade_year INTEGER,
    trade_make TEXT,
    trade_model TEXT,
    has_title BOOLEAN,
    comments TEXT NOT NULL,
    write_up_date TIMESTAMP,
    deposit INTEGER NOT NULL,
    employee INTEGER REFERENCES employees(id) NOT NULL
);
