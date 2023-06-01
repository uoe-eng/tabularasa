import faker from 'faker'
/*
  Generate fake data representing an imaginary blog service.

  people:
    firstName
    lastName
    email
    city
    blogs: (one) people -> (many) blogs
    articles: (many) people -> (many) articles

  Blogs have a single author
  blogs:
    title
    content
    date
    author: (many) blogs -> (one) people
    articles: (one) blogs ->  (many) articles

  Articles are imagined to be multi-authored pieces.
  articles:
    title
    content
    published
    authors: (many) articles -> (many) people
*/
let COUNT = 100

const fakeData = function (count) {
  let data = {}

  if (count) {
    COUNT = count
  }
  for (let [type, func] of Object.entries(generators)) {
    data[type] = {}
    for (let i = 0; i < COUNT; i++) {
      data[type][i.toString()] = func(i)
    }
  }
  for (let i = 0; i < COUNT; i++) {
    // Create relationships for every 5th person
    if (i % 5 === 0) {
      data['people'][i]['blogs'].push(data['blogs'][i + 1], data['blogs'][i + 2])
      data['people'][i]['articles'].push(data['articles'][i + 3], data['articles'][i + 4])
      data['blogs'][i + 1]['author'] = data['people'][i]
      data['blogs'][i + 2]['author'] = data['people'][i]
      data['blogs'][i + 1]['articles'].push(data['articles'][i + 1], data['articles'][i + 2])
      data['blogs'][i + 2]['articles'].push(data['articles'][i + 3], data['articles'][i + 4])
      data['articles'][i + 3]['authors'].push(data['people'][i + 1], data['people'][i + 2])
      data['articles'][i + 4]['authors'].push(data['people'][i + 3], data['people'][i + 4])
    }
  }
  return data
}

const generators = {
  people: function (i) {
    return {
      id: i,
      firstName: { nestedFirstName: faker.name.firstName() },
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      city: faker.address.city(),
      blogs: [],
      articles: [],
    }
    /* eslint-enable camelcase */
  },
  blogs: function (i) {
    return {
      id: i,
      title: faker.lorem.words(3),
      content: faker.lorem.paragraph(),
      date: faker.date.past().toISOString(),
      author: {},
      articles: [],
    }
  },
  articles: function (i) {
    return {
      id: i,
      title: faker.lorem.words(),
      content: faker.lorem.paragraph(),
      published: faker.random.boolean(),
      authors: [],
    }
  },
}

export { fakeData, generators }
