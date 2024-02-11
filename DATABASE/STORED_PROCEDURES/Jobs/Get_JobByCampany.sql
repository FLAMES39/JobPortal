USE JobPortal 
GO


--GetJobsByCompany
CREATE OR ALTER  PROCEDURE GetJobsByCompany (
    @CompanyID INT
)
AS
BEGIN
    SELECT * FROM Jobs WHERE CompanyID = @CompanyID;
END;