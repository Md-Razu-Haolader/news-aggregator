# News Aggregator

Fetch latest news from provided news feed url

## Required NodeJs Version: 21.7.1 or higher

### Run cli

```bash
yarn install
```

> Prisma ORM is used on this project. MongoDB replica set is required to run MongoDB with Prisma ORM. Run below docker cli to create MongoDB replica set in the docker container.

```bash
sudo docker compose up -d
```

> Now create a .env file at the project root and copy content from .env.example file and provide necessary value on it.

### To run project in development mode

```bash
yarn dev
```

### To build project

```bash
yarn build
```

### To run tests

```bash
yarn test
```

### To check lint errors

```bash
yarn lint
```

### To check lint errors in tests files

```bash
yarn lint:tests
```

### Sample endpoint to sync news: http://localhost:3000/api/v1/news/sync

Method: POST

Sample response:

```json
{
  "message": "News sync successfully",
  "data": [
    {
      "title": "Alcaraz records straight sets win over Djkovic for second Wimbledon title",
      "description": "Defending champion Alcaraz swept aside seven-time Wimbledon winner Djokovic in a stunning 6-2,6-2,7-6 (7-4) win.",
      "publicationDate": "2024-07-14T18:14:04.000Z",
      "sourceUrl": "https://www.aljazeera.com/sports/2024/7/14/alcaraz-records-straight-sets-win-over-djkovic-for-second-wimbledon-title?traffic_source=rss",
      "topics": [
        "alcaraz",
        "straight sets",
        "over djkovic",
        "second wimbledon title defending champion alcaraz",
        "wimbledon winner djokovic",
        "6-2,6-2,7-6 (7-4",
        ") win."
      ],
      "people": [],
      "locations": [],
      "organizations": []
    },
    {
      "title": "Former US Diplomat: Washington losing standing after Gaza War",
      "description": "US's ‘immoral and inhumane’ policy on Gaza convinced veteran US diplomat Hala Rharrit to leave the State Department.",
      "publicationDate": "2024-07-14T16:45:00.000Z",
      "sourceUrl": "https://www.aljazeera.com/program/the-bottom-line/2024/7/14/former-us-diplomat-washington-losing-standing-after-gaza-war?traffic_source=rss",
      "topics": [
        "former us diplomat:",
        "washington",
        "gaza war us's",
        "inhumane’ policy",
        "gaza",
        "veteran us diplomat hala rharrit",
        "the state department."
      ],
      "people": ["hala rharrit"],
      "locations": ["washington", "gaza", "gaza", "state department."],
      "organizations": []
    }
  ]
}
```

### Sample endpoint to fetch news: http://localhost:3000/api/v1/news

Method: GET

Available filter query param:

limit=10 (number of item show on each page)

page=2 (pagination page number)

keywords=gaza,usa (comma separated string to filter by news topic)

people=jhon,david (comma separated string to filter by people name)

locations=bangladesh,usa (comma separated string to filter by location)

organizations=nato,unesco (comma separated string to filter by organizations)

Sample url with all filter params:

http://localhost:3000/api/v1/news?page=1&limit=15&keywords=gaza,usa,nato&people=jhon,david&locations=israel,wales,england&organizations=military,bank

Sample response:

```json
{
  "message": "Total 20 news found.",
  "data": [
    {
      "_id": "66941e0e7224429e9b7f38d8",
      "title": "Olympic Torch Reaches Paris in Elegant Style",
      "description": "The flame has been on a long journey since its arrival in May, but hopes that it would bring the country together have foundered on political division.",
      "publication_date": "2024-07-14T18:40:43Z",
      "source_url": "https://www.nytimes.com/2024/07/14/world/europe/paris-olympics-torch-carrying.html",
      "topics": [
        "olympic torch reaches paris",
        "elegant style",
        "the flame",
        "a long journey",
        "its arrival",
        "may,",
        "it",
        "the country together",
        "political division."
      ],
      "people": [],
      "locations": ["paris"],
      "organizations": [],
      "created_at": "2024-07-14T18:50:54.196Z"
    },
    {
      "_id": "66941e0e7224429e9b7f389e",
      "title": "Alcaraz records straight sets win over Djkovic for second Wimbledon title",
      "description": "Defending champion Alcaraz swept aside seven-time Wimbledon winner Djokovic in a stunning 6-2,6-2,7-6 (7-4) win.",
      "publication_date": "2024-07-14T18:14:04Z",
      "source_url": "https://www.aljazeera.com/sports/2024/7/14/alcaraz-records-straight-sets-win-over-djkovic-for-second-wimbledon-title?traffic_source=rss",
      "topics": [
        "alcaraz",
        "straight sets",
        "over djkovic",
        "second wimbledon title defending champion alcaraz",
        "wimbledon winner djokovic",
        "6-2,6-2,7-6 (7-4",
        ") win."
      ],
      "people": [],
      "locations": [],
      "organizations": [],
      "created_at": "2024-07-14T18:50:54.193Z"
    }
  ],
  "meta": {
    "totalPage": 9,
    "current": 1,
    "totalItem": 164,
    "perPage": 20
  }
}
```

> To configure news feed urls, update feedUrls variable from: src/config/index.ts

> To configure news sync schedule time, update NEWS_SYNC_SCHEDULE_TIME constant variable from: src/constant/index.ts

### Data structure to store news data

MongoDB collection name news

```json
News {
  id              String
  title           String
  description     String
  publicationDate DateTime
  sourceUrl       String
  topics          String[]
  people          String[]
  organizations   String[]
  locations       String[]
  createdAt       DateTime
}
```

### Application folder structure

<details>
<summary>src</summary>
 <p>This folder contains all the necessary files and folders related to the project logic</p>
 <details>
 <summary>config</summary>
 <p>It contains app configurations </p>
</details>
  <details>
  <summary>constant</summary>
  <p>Application constant variable are placed here</p>
 </details>
  <details>
  <summary>controllers</summary>
  <p>It contains controller classes</p>
 </details>
 <details>
  <summary>database</summary>
  <p>Prisma database model files are located here</p>
</details>
 <details>
  <summary>exception</summary>
  <p>This folder contains all the custom exceptions</p>
</details>
 <details>
  <summary>helpers</summary>
  <p>All the helper classes are located here</p>
</details>
 <details>
  <summary>middleware</summary>
  <p>It contains all middlewares</p>
</details>
 <details>
  <summary>providers</summary>
  <p>It containt application service provider</p>
</details>
<details>
  <summary>repositories</summary>
  <p>It contains all database query repository</p>
</details>
<details>
  <summary>scheduler</summary>
  <p>It contains scheduler logic to run corn job/scheduler</p>
</details>
<details>
  <summary>types</summary>
  <p>Typescript types are written here</p>
</details>
 <details>
  <summary>utils</summary>
  <p>It contains utility methods</p>
</details>
</details>

<details>
 <summary>logs</summary>
 <p>It contains all error logs</p>
</details>
<details>
  <summary>tests</summary>
  <p>Test cases are written here</p>
</details>
