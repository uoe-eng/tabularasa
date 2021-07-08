import faker from 'faker'
/*
  Generate fake data representing an imaginary blog service.

  people:
    first_name
    last_name
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
let DATA = {}

const fakeData = function (count) {
  if (count) {
    COUNT = count
  }
  for (let [type, func] of Object.entries(generators)) {
    DATA[type] = {}
    for (let i = 0; i < COUNT; i++) {
      DATA[type][i.toString()] = func(i)
    }
  }
  for (let i = 0; i < COUNT; i++) {
    // Create relationships for every 5th person
    if (i % 5 === 0) {
      DATA['people'][i]['blogs'].push(DATA['blogs'][i + 1], DATA['blogs'][i + 2])
      DATA['people'][i]['articles'].push(DATA['articles'][i + 3], DATA['articles'][i + 4])
      DATA['blogs'][i + 1]['author'] = DATA['people'][i]
      DATA['blogs'][i + 2]['author'] = DATA['people'][i]
      DATA['blogs'][i + 1]['articles'].push(DATA['articles'][i + 1], DATA['articles'][i + 2])
      DATA['blogs'][i + 2]['articles'].push(DATA['articles'][i + 3], DATA['articles'][i + 4])
      DATA['articles'][i + 3]['authors'].push(DATA['people'][i + 1], DATA['people'][i + 2])
      DATA['articles'][i + 4]['authors'].push(DATA['people'][i + 3], DATA['people'][i + 4])
    }
  }
  return DATA
}

const generators = {
  people: function (i) {
    return {
      id: i,
      first_name: { nested_first_name: faker.name.firstName() },
      last_name: faker.name.lastName(),
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
