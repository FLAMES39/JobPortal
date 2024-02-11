USE JobPortal
GO


--Delete reviews
CREATE OR ALTER PROCEDURE DeleteCompanyReview (
   @ReviewID INT
)
AS
BEGIN
    DELETE FROM CompanyReviews WHERE ReviewID = @ReviewID;
END;