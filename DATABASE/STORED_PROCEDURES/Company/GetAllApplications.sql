

USE JobPortal
GO



CREATE OR ALTER PROCEDURE sp_getAllApplications
AS
BEGIN
SELECT * FROM Applications
END