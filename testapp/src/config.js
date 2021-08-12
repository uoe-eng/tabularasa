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
            component: 'ChipsDisplay',
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
            component: 'TextInput',
          },
          {
            label: 'First Name',
            field: 'first_name.nested_first_name',
            component: 'TextInput',
          },
          {
            label: 'Last Name',
            field: 'last_name',
            component: 'TextInput',
          },
          {
            label: 'Email',
            field: 'email',
            component: 'TextInput',
          },
          {
            label: 'City',
            field: 'city',
            component: 'TextareaInput',
          },
          {
            label: 'Blogs',
            field: 'blogs[].title',
            component: 'AutocompleteInput',
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
            component: 'AutocompleteInput',
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
            component: 'ChipsDisplay',
          },
          {
            label: 'Articles (via author)',
            field: 'author.articles[].title',
            component: 'ChipsDisplay',
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
            component: 'TextInput',
          },
          {
            label: 'Title',
            field: 'title',
            component: 'TextInput',
          },
          {
            label: 'Author',
            field: 'author.last_name',
            component: 'AutocompleteInput',
            methods: {
              onComplete: (query) => {
                console.log('CHANGED', query)
              },
            },
          },
          {
            label: 'Date created',
            field: 'date',
            component: 'DateInput',
          },
          {
            label: 'Contributors',
            field: 'articles[].authors[].last_name',
            component: 'AutocompleteInput',
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
            component: 'BooleanDisplay',
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
            component: 'TextInput',
          },
          {
            label: 'Title',
            field: 'title',
            component: 'TextInput',
          },
          {
            label: 'Published?',
            field: 'published',
            component: 'BooleanInput',
          },
          {
            label: 'Authors',
            field: 'authors[].last_name',
            component: 'AutocompleteInput',
            properties: {
              multiple: true,
            },
          },
        ],
      },
    },
  }
}
