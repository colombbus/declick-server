## resources formats

The resources served by this server follow specific formats described in this
document.

### user

```js
{
  id: Number,
  username: String,
  email: String,
  role: 'user' | 'admin'
}
```

### project

```js
{
  id: Number,
  name: String,
  type: 'application' | 'challenge',
  description: String,
  public: Boolean,
  owner: user
}
```

### resource

```js
{
  id: Number,
  name: String,
  mediaType: String,
  version: Number,
  project: project
}
```

### course

```js
{
  id: Number,
  name: String,
  description: String
}
```

### stage

```js
{
  id: Number,
  course: course,
  project: project,
  next: stage
}
```

### results

```js
{
  id: Number,
  user: user,
  score: Number,
  data: JSON
}
```
