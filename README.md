
# TV show catalog

The TV Show Explorer project is a web application that allows users to explore and discover TV shows based on various genres. It leverages the TVMaze API to fetch TV show data and presents it in a user-friendly manner. Users can view popular TV shows on a dashboard, access detailed information about each show, and search for specific shows. The application focuses on providing a seamless user experience while adhering to frontend best practices.




## Tech Stack

Vue3 (script setup), Vite, Typescript




## Run Locally

Clone the project

```bash
  git clone https://github.com/angjelonuho/tv-show-catalog.git
```

Go to the project directory

```bash
  cd tv-show-catalog
```

Install dependencies

```bash
  npm install
```

Start the development server:

```bash
  npm run dev
```


## Architectural Decisions
I made several architectural decisions throughout the project to ensure code quality, performance, and a satisfying user experience. Below, I outline the key decisions and their justifications:

### File Structure
To maintain a clean and organized codebase, I adopted a Flat Component Directory structure for the project. This approach groups related files together, making it easier to locate and manage components. It improves code reusability and maintainability by promoting a modular design and reducing unnecessary nesting. This file structure enables better collaboration and scalability in the long term.

### Caching API Results
To optimize performance and reduce unnecessary API calls, I implemented a caching mechanism for the TV show data. Upon the initial API call, the result is cached and subsequent requests retrieve the data from the cache. This approach minimizes network overhead, improves response times, and reduces dependency on the external API. Considering that the TVMaze API updates daily, caching the data provides a stable and consistent experience for users while reducing the load on the API servers.

### Filtering and Searching
The application supports filtering TV shows based on different genres and displaying them on the dashboard. All filtering operations are performed using the cached data, ensuring optimal performance by avoiding additional API calls. However, for the search functionality, I decided to fetch data directly from the API to enable searching for TV shows that are not present in the cache. This decision was made to strike a balance between performance and providing a comprehensive search capability for the users.

### Sorting TV Shows
To enhance the user experience, I automatically sorted the TV shows on the dashboard based on their ratings. By presenting the highest-rated shows first, users can quickly identify popular options without the need for manual sorting. This approach saves users time and effort while delivering a more engaging and intuitive browsing experience.

### Styling
To provide you with a better understanding of my CSS skills, I opted to use plain CSS for styling.

### Testing
During development, I implemented end-to-end (e2e) tests and unit tests to ensure the reliability and stability of the application. Although I aimed to achieve comprehensive test coverage, due to time constraints, I was unable to fulfill that goal entirely. However, the existing test suite provides confidence in critical functionality and aids in catching regressions. Given more time, I would have expanded the test coverage to achieve a higher degree of code quality and stability.

Please note that this is an overview of the major architectural decisions made for this project. If you have any questions or need further details on specific aspects, please don't hesitate to reach out.
## Running Tests

Most usefull tests but also check the scripts in pakcage.json for more

Run unit tests

```bash
  npm run test:unit
```

Run e2e tests locally

```bash
  npm run test:e2e:dev
```
