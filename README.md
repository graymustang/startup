# Roundly

[My Notes](notes.md)

Roundly allows users to combine tools from multiple apps/websites into one. Golfers will be able to track scores, find courses, and share photos and scores with other golfers.

> [!NOTE]
> This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

### Elevator pitch

I'm creating a website for golfers who want an easy way to track their game. Instead of just recording scores, the website lets you log rounds, track your stats over time, find golf courses, and upload photos from the courses
that you've played. The overall goal is to give golfers an easy way to track progress while also making a record of the courses they played and the experiences they have had.

### Design

![Design image](roundly-home-page.png)

This is the planned layout for Roundly's home page. Users can navigate to different sections of the website to log rounds, view their stats, find courses, upload photos, and get access to other golf related things. The home
page is just to show all of the buttons and give a quick look of recent golf stats.

```mermaid
sequenceDiagram
    actor User
    participant Roundly
    participant Database

    User->>Roundly: Log a golf round
    Roundly->>Database: Save round and scores
    Database-->>Roundly: Round saved
    Roundly-->>User: Display updated stats
```

### Key features

- Round logging: Users will be able to keep track of each hole on a course and their respective scores.
- Stat tracking: Users can view stats from previous rounds, like average scores, fairways hit, and average putts.
- Course finder: Users can search and find golf courses in their area.
- Photo Gallery: Users can upload and view photos they have taken on the course.
- Accounts: Users can create an account and log in so their rounds, stats, and photos are saved to their profile.
- Sharing: Users will be able to share scores with other golfers.

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Create the basic structire for the home page and other pages.
- **CSS** - Style the website and make it consistent.
- **React** - Build reusable components like navigation, round logging, and course info. React routing will be used to go between pages, and the page will update when the user enters in scores and other info.
- **Service** - Create the backend endpoints for things like retrieving and saving user info, rounds, stats, and photos. I will use [Google Maps API](https://developers.google.com/maps) to find courses nearby.
- **DB/Login** - Users will be able to create an account and login. The database will store account info along with rounds, stats, and photos.
- **WebSocket** - Allow users to see scores shared by other golfers in real time.

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] I completed the prerequisites for this deliverable (Git commit requirement)
- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [X] Description of key features
- [X] Description of how you will use each technology including your 3rd party API and use of WebSocket
- [X] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Rented EC2 server** - Rented the EC2 server
- [X] **Leased domain name** - Roundly
- [X] **Server accessible** from my domain: [https://roundly.click](https://simon.roundly.click) - 

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [X] **HTML pages** - Created pages for home page, logging rounds, stats, finding courses, gallery, and login.
- [X] **Proper HTML element usage** - Used header, nav, main, form, table, figure, footer, and other HTML tags.
- [X] **Links** - Added navigation links between all of the main pages.
- [X] **Text** - Added text that describes my website, stats, course info, and other content.
- [X] **3rd party API placeholder** - Added a google maps course map and course search placeholder.
- [X] **Images** - Added golf course images.
- [X] **Login placeholder** - Added email and password inputs, login and create account buttons, and current user display.
- [X] **DB data placeholder** - Added a saved round table that represents rounds that will be stored in the database.
- [X] **WebSocket placeholder** - Added a placeholder in the stats.html page. It will display real time scores.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Visually appealing colors and layout. No overflowing elements.** - I did not complete this part of the deliverable.
- [ ] **Use of a CSS framework** - I did not complete this part of the deliverable.
- [ ] **All visual elements styled using CSS** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing using flexbox and/or grid display** - I did not complete this part of the deliverable.
- [ ] **Use of a imported font** - I did not complete this part of the deliverable.
- [ ] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.
- [ ] **Uses BCrypt to hash passwords** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
