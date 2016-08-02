# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

## JSON API

### Users

- `POST /api/users`

### Session

- `POST /api/session`
- `DELETE /api/session`

### Events

- `GET /api/events`
  - Customer-Sessions index/search
  - accepts query params to filter session data

### Annotations

- `POST /api/annotations`
  - add annotation to data point by query string
- `PATCH /api/annotations/:id`
  - update annotation by id
- `DELETE /api/annotations/:id`
  - remove annotation from data point by id

### Tags

- `POST /api/annotations/:annotation_id/tags`
  - add tag to annotation by user_id
- `DELETE /api/annotations/:annotation_id/tags/:id`
  - remove tag from annotation by user_id
