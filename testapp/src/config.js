export default (vue) => {
  console.log('V', vue.$store)
  return {
    people: {
      SLDList: {
        fields: [
          {
            label: 'ID',
            field: 'id',
          },
          {
            label: 'First Name',
            field: 'first_name.nested_first_name',
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
            field: 'blogs[].title',
            display: 'ChipsDisplay',
            properties: {},
          },
        ],
        properties: {
          paginatorPosition: 'top',
          totalRecords: vue.$store.getters.itemCount,
        },
      },
      SLDDetail: {
        fields: [
          {
            label: 'ID',
            field: 'id',
            input: 'TextInput',
          },
          {
            label: 'First Name',
            field: 'first_name.nested_first_name',
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
            input: 'TextareaInput',
          },
          {
            label: 'Blogs',
            field: 'blogs[].title',
            input: 'AutocompleteInput',
            properties: {
              // Property to extract from objects returned by onComplete function
              field: 'title',
              multiple: true,
              // function to call for search completion
            },
            methods: {
              onComplete: (query) => {
                console.log('que', query)
                // FIXME: Lookup blogs in store
                return vue.$store.getters['search'](['blogs', 'title', query])
              },
            },
          },
          {
            label: 'Articles',
            field: 'articles[].title',
            input: 'AutocompleteInput',
            properties: {
              multiple: true,
            },
          },
        ],
      },
    },
    blogs: {
      SLDList: {
        fields: [
          {
            label: 'ID',
            field: 'id',
          },
          {
            label: 'Title',
            field: 'title',
          },
          {
            label: 'Date created',
            field: 'date',
          },
          {
            label: 'Contributors',
            field: 'articles[].authors[].last_name',
            display: 'ChipsDisplay',
          },
          {
            label: 'Contributors Blogs',
            field: 'author.blogs[].title',
            display: 'ChipsDisplay',
          },
        ],
        properties: {
          paginatorPosition: 'top',
        },
      },
      SLDDetail: {
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
            field: 'author.last_name',
            input: 'AutocompleteInput',
            properties: {
              onComplete: (query) => {
                return [query, 'a', 'b', 'c']
              },
            },
          },
          {
            label: 'Date created',
            field: 'date',
            input: 'DateInput',
          },
          {
            label: 'Contributors',
            field: 'articles[].authors[].last_name',
            input: 'AutocompleteInput',
            properties: {
              multiple: true,
            },
          },
        ],
      },
    },
    articles: {
      SLDList: {
        fields: [
          {
            label: 'ID',
            field: 'id',
          },
          {
            label: 'Title',
            field: 'title',
          },
          {
            label: 'Published?',
            field: 'published',
            display: 'BooleanDisplay',
          },
        ],
        properties: {
          paginatorPosition: 'both',
        },
      },
      SLDDetail: {
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
            label: 'Published?',
            field: 'published',
            input: 'BooleanInput',
          },
          {
            label: 'Authors',
            field: 'authors',
            input: 'AutocompleteInput',
          },
        ],
      },
    },
  }
}
