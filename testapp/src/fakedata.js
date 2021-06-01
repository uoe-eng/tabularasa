import faker from 'faker'
/*
  Generate fake data representing an imaginary blog service.

  people:
    given_name
    family_name
    email
    city
    blogs: (one) people -> (many) blogs
    articles: (many) people -> (many) articles

  Blogs have a single author
  blogs:
    title
    content
    creation date
    author: (many) blogs -> (one) people

  Articles are imagined to be multi-authored pieces.
  articles:
    title
    content
    authors: (many) articles -> (many) people
*/
let COUNT = 100
let DATA = {}

export default function (count) {
  if (count) {
    COUNT = count
  }
  for (let [type, func] of Object.entries(generators)) {
    DATA[type] = new Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      DATA[type][i] = func(i)
    }
  }
  for (let i = 0; i < COUNT; i++) {
    // Create relationships for every 5th person
    if (i % 5 === 0) {
      DATA['people'][i]['blogs'].push(DATA['blogs'][i + 1], DATA['blogs'][i + 2])
      DATA['people'][i]['articles'].push(DATA['articles'][i + 3], DATA['articles'][i + 4])
      DATA['blogs'][i + 1]['author'] = DATA['people'][i]
      DATA['blogs'][i + 2]['author'] = DATA['people'][i]
      DATA['articles'][i + 3]['author'] = DATA['people'][i]
      DATA['articles'][i + 4]['author'] = DATA['people'][i]
    }
  }
  return DATA
}

const generators = {
  people: function (i) {
    // ESLint doesn't like snake-case vars
    /* eslint-disable camelcase*/
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
      title: faker.lorem.words(),
      content: faker.lorem.paragraph(),
      date: faker.date.past().toISOString(),
      author: {},
    }
  },
  articles: function (i) {
    return {
      id: i,
      title: faker.lorem.words(),
      content: faker.lorem.paragraph(),
      authors: [],
    }
  },
}
