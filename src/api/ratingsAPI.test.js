import { getEstablishmentRatings } from "./ratingsAPI";

describe("Ratings API", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("call the ratings api with the provided page number and returns the data", async () => {
    // Given
    let pageNum = 1;
    let expected = { test: "test" };
    fetch.mockResponseOnce(JSON.stringify(expected));

    // When
    let actual = await getEstablishmentRatings(pageNum);

    // Then
    expect(actual).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      `http://api.ratings.food.gov.uk/Establishments/basic/${pageNum}/10`
    );
  });
});
