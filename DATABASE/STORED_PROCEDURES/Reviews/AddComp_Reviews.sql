USE JobPortal
GO


--ADDING COMPANY REVIEW
CREATE OR ALTER PROCEDURE AddCompanyReview (
    @CompanyID INT,
    @UserID INT,
    @Rating INT,
    @Comment TEXT

)
AS
BEGIN
    INSERT INTO CompanyReviews (CompanyID, UserID, Rating, Comment)
    VALUES (@CompanyID, @UserID, @Rating, @Comment);
END;