const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

// GraphQL schema
// Query
/* 
course: filtre par id, retour de type Course
courses: filtre par topic, retour de type array de Course
*/

// Mutation
/* 
updateCourseTopic: update course, retour de type Course
*/
const schema = buildSchema(`
  type Query {
    course(id: Int!): Course
    courses(topic: String): [Course]
  },
  type Mutation {
    updateCourseTopic(id: Int!, topic: String!): Course
  }
  type Course {
    id: Int
    title: String
    author: String
    description: String
    topic: String
    url: String
  },
`);

// Data
const coursesData =  [
  {
    id: 1,
    title: 'The Complete Node.js Developer Course',
    author: 'Andrew Mead, Rob Percival',
    description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
    topic: 'Node.js',
    url: 'https://codingthesmartway.com/courses/nodejs/'
  },
  {
    id: 2,
    title: 'Node.js, Express & MongoDB Dev to Deployment',
    author: 'Brad Traversy',
    description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
    topic: 'Node.js',
    url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
  },
  {
    id: 3,
    title: 'JavaScript: Understanding The Weird Parts',
    author: 'Anthony Alicea',
    description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
    topic: 'JavaScript',
    url: 'https://codingthesmartway.com/courses/understand-javascript/'
  }
]

// Actions
const getCourse = (args) => coursesData.filter(course => course.id == args.id)[0];

const getCourses = (args) => args.topic ? coursesData.filter(course => course.topic === args.topic) : coursesData;

const updateCourseTopic = ({id, topic}) => {
  coursesData.map(course => {
      if (course.id === id) {
          course.topic = topic;
          return course;
      }
  });
  return coursesData.filter(course => course.id === id) [0];
}

// Resolver
// connecte les query: coure => getCourse, courses => getCourses
const root = {
  course: getCourse,
  courses: getCourses,
  updateCourseTopic: updateCourseTopic,
};

// Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));