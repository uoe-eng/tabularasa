export default {
  people: {
    ListTable: {
      fields: [
        {
          label: 'ID',
          field: 'id',
        },
        {
          label: 'First Name',
          field: 'first_name',
        },
        {
          label: 'Last Name',
          field: 'last_name',
        },
        {
          label: 'Email',
          field: 'email',
        },
        {
          label: 'City',
          field: 'city',
        },
        {
          label: 'Blogs',
          field: 'blogs',
        },
      ],
      properties: {
        paginatorPosition: 'top',
      },
    },
    DetailCard: {
      fields: [
        {
          label: 'ID',
          field: 'id',
          input: 'TextInput',
        },
        {
          label: 'First Name',
          field: 'first_name',
          input: 'TextInput',
        },
        {
          label: 'Last Name',
          field: 'last_name',
          input: 'TextInput',
        },
        {
          label: 'Email',
          field: 'email',
          input: 'TextInput',
        },
        {
          label: 'City',
          field: 'city',
          input: 'TextInput',
        },
        {
          label: 'Blogs',
          field: 'blogs',
          input: 'ChipsInput',
          relationship: 'TOMANY',
        },
        {
          label: 'Articles',
          field: 'articles',
          input: 'ChipsInput',
          relationship: 'TOMANY',
        },
      ],
    },
  },
  blogs: {
    ListTable: {
      fields: [
        {
          label: 'ID',
          field: 'id',
        },
        {
          label: 'Title',
          field: 'title',
        },
      ],
      properties: {
        paginatorPosition: 'top',
      },
    },
    DetailCard: {
      fields: [
        {
          label: 'ID',
          field: 'id',
          input: 'TextInput',
        },
        {
          label: 'Title',
          field: 'title',
          input: 'TextInput',
        },
        {
          label: 'Author',
          field: 'author',
          input: 'DropdownInput',
          relationship: 'TOONE',
        },
      ],
    },
  },
  articles: {
    ListTable: {
      fields: [
        {
          label: 'ID',
          field: 'id',
        },
        {
          label: 'Title',
          field: 'title',
        },
      ],
      properties: {
        paginatorPosition: 'top',
      },
    },
    DetailCard: {
      fields: [
        {
          label: 'ID',
          field: 'id',
          input: 'TextInput',
        },
        {
          label: 'Title',
          field: 'title',
          input: 'TextInput',
        },
        {
          label: 'Authors',
          field: 'authors',
          input: 'ChipsInput',
          relationship: 'TOMANY',
        },
      ],
    },
  },
}
