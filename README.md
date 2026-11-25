# demo-gift-web

## Gift catalog and recommendations

The catalog is maintained in `src/data/gifts.ts`; additional sample items live in
`src/data/giftCatalogExpansion.ts`. Gift tags are shared from `src/data/giftTags.ts`
so ranking rules can rely on consistent values.

The current catalog contains 34 gift ideas, including 15 priced below 200,000 VND
(about 44%, close to the survey guideline of 40%). The recommendation sort uses
explainable rules: practical gifts receive 2 points, gift-ready packaging receives
1 point, matching personality traits receive 3 points each, and exact tag matches
receive a strong preference. For a selected occasion with a budget up to 150,000 VND,
decor and experience ideas receive an additional boost. Results are paginated at
15 items per page.

These are sample gift ideas with estimated prices, not verified live listings.
Ratings and review counts remain empty until they can be sourced from real reviews;
the catalog also does not claim that a shop is verified or provide purchase links.
The supplied discovery documents recommend waiting for real click and relevance
feedback before training an ML recommender, so the current implementation uses
content-based weighted rules instead.
