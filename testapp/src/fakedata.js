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
    author: (many) blogs -> (one) people

  Articles are imagined to be multi-authored pieces.
  articles:
    title
    content
    authors: (many) articles -> (many) people
*/

export default function (count = 100) {
  const data = {}
  for (let [type, func] of Object.entries(generators)) {
    data[type] = new Array(count)
    for (let i = 0; i < count; i++) {
      data[type][i] = func(i)
    }
  }
  return data
}

const generators = {
  people: function (i) {
    const obj = {}
    // ESLint doesn't like snake-case vars
    /* eslint-disable camelcase*/
    obj.id = i
    obj.first_name = faker.name.firstName()
    obj.last_name = faker.name.lastName()
    obj.email = faker.internet.email()
    obj.city = faker.address.city()
    /* eslint-enable camelcase */
    return obj
  },
  blogs: function (i) {
    return {
      id: i,
      title: faker.lorem.words(),
      content: faker.lorem.paragraph(),
    }
  },
  articles: function (i) {
    return {
      id: i,
      title: faker.lorem.words(),
      content: faker.lorem.paragraph(),
    }
  },
}
