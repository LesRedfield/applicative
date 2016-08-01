# FresherNote

[app.licative.com][heroku] **Note:** This will be a link to the production site

[heroku]: http://app.licative.com

## Minimum Viable Product

Applicative is a web application inspired by Indicative that will be built using Ruby on Rails and React.js.

By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [ ] Hosting on Heroku
- [ ] New account creation, login, and guest/demo login
- [ ] A production README, replacing this README
- [ ] Dashboard
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Segmentation
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Annotations for Segmentation Data Points
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Tagging for annotations
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Tutorial for using Segmentation
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: docs/views.md
[schema]: docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication (1 days, W1 Tu 6pm)

**Objective:** Functioning rails project with front-end Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication backend setup
- [ ] create `StaticPages` controller and root view
- [ ] set up webpack & flux scaffold with skeleton files
- [ ] setup `APIUtil` to interact with the API
- [ ] set up flux cycle for frontend auth
- [ ] user signup/signin components
- [ ] blank landing component after signin
- [ ] style signin/signup components
- [ ] seed users

### Phase 2: Dashboard Model, API, and components (3 days, W1 F 6pm)

**Objective:** Dashboard displays four charts of demo data

- [ ] create `Dashboard` model
- [ ] seed the database with demo data
- [ ] test out API interaction in the console.
- [ ] integrate `react-highcharts` (based on HighCharts.js).
- implement each dashboard component, building out the flux loop as needed.
  - [ ] Funnel Chart
  - [ ] Segmentation Charts (2)
  - [ ] Cohorts Chart

### Phase 3: Segmentation (3 days, W2 W 6pm)

**Objective:** Interactive Segmentation Chart can be altered by dragging/dropping events/properties

- [ ] create `Segmentation` model
- [ ] Use CSS to style new components

### Phase 4: Annotations (1 days, W2 Th 6pm)

**Objective:** Segmentation data points can be tagged with annotations.

- [ ] create `Annotation` model and join table
- build out API, Flux loop, and components for:
  - [ ] fetching annotations for data point
  - [ ] adding annotations to data point
- [ ] Style new elements
- [ ] Seed annotations and tag the seeded data points

### Phase 5: Tagging for Annotations (1 days, W2 F 6pm)

**objective:** Enable Tagging for Annotations.

- [ ] Allow users to tag one another to allow annotation tracking

### Bonus Features (TBD)
- [ ] Build out Funnel feature
- [ ] Build out Cohorts feature
- [ ] Implement more advanced statistical analyses
- [ ] Integration of client data

[phase-one]: docs/phases/phase1.md
