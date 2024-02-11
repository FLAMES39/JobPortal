USE JobPortal
Go

-- JobCategories Table
CREATE TABLE JobCategories (
    CategoryID INT IDENTITY PRIMARY KEY ,
    Name VARCHAR(255),
    Description TEXT
);