# GraphQl

## Script
```
$ yarn
```

## Exemple 1
```
$ node server.js
```
Query
```js
{
    message
}
```

## Exemple 2
```
$ node server2.js
```
Query
```js
fragment courseFields on Course {
  title
  author
  description
  topic
  url
}

query getSingleCourseAuthor($courseID: Int!) {
  course(id: $courseID) {
    author
  }
}

query getSingleCourseData($courseID: Int!) {
  course(id: $courseID) {
    id
  }
}

query getCoursesListByTopic($courseTopic: String) {
  courses(topic: $courseTopic) {
    ...courseFields
  }
}

query getCourseWithFragments($courseID1: Int!, $courseID2: Int!) {
      course1: course(id: $courseID1) {
             ...courseFields
      },
      course2: course(id: $courseID2) {
            ...courseFields
      } 
}

mutation updateCourseTopic($id: Int!, $topic: String!) {
  updateCourseTopic(id: $id, topic: $topic) {
    ... courseFields
  }
}
```