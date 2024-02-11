USE JobPortal
GO


--Update revies
CREATE OR ALTER  PROCEDURE UpdateCompanyReview (
    @ReviewID INT,
    @Rating INT,
    @Comment TEXT
)
AS
BEGIN
    UPDATE CompanyReviews
    SET Rating = @Rating, Comment = @Comment
    WHERE ReviewID = @ReviewID;
END;