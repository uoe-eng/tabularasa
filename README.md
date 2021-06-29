# SLD - Search List Detail

SLD is a Vue plugin which acts as a wrapper around a variety of [PrimeVue]{https://www.primefaces.org/primevue/} widgets to provide a Search-List-Detail interface.

SLD takes in a `configuration` 'schema' (which defines the look and feel of the UI, and how data is presented), and `collections` data, which contains data items to be displayed.

SLD treats `collection` data as read-only. No changes are made to the passed-in object - instead, when data is edited, events are generated, containing the old and new data.

# Installation

First create a new Vue app:

vue create <my-app>

Edit `src/main.js` adding the following before `new Vue` is called:

```
import * as sld from 'sld'
Vue.use(sld)
```

# Demo

There is a `testapp` which demonstrates the use of SLD. This can be run by cloning this repository and then running:

```
# Install the package dependencies
yarn

# Run the demo
yarn serve
```

# Usage

## Configuration

### Data

SLD follows the convention of DataTable to expect data as an array of objects. These are referred to here as `collections` of `items`.

### Schema

SLD uses a configuration schema to configure the UI, and the presentation of the data. Where possible order in the schema will be preserved in the UI.

It takes the following structure:

```
{
  Collection_Name: {
    SLDList: {
      fields: [
        label: 'Column header label',
        // Property in the data object. Can use dot-notation - e.g. 'author.surname' for nested objects.
        field: 'fieldName',
      ],
      properties: {
        // Properties to be passed direct to DataTable (for styling etc)
      },
    },
    SLDDetail: {
      fields: [
        {
          label: 'Field label',
          // Property in the data object. Can use dot-notation - e.g. 'author.surname' for nested objects.
          field: 'fieldName',
          input: 'TextInput', // Input widget to be used to display this field.
          props: {
            // Properties to be passed direct to the Input (i.e. PrimeVue component config)
          }
        },
      ],
      events: {
        // Events to be passed direct to SLDDetail's child components/inputs (for custom events)
      }
      methods: {
        // Methods to be passed direct to SLDDetail's child components/inputs (for callbacks etc)
      }
      props: {
        // Properties to be passed direct to SLDDetail's child components/inputs (for styling etc)
      }
    }
  }
}
```
### Field values

The value of each `field` in `SLDDetail.fields` can be specified in one of 3 ways:

* `name` - the name of a property in the object to be displayed.
* `name.childname` - the name of a nested 'child' property inside the 'parent' property. For example, `author.last_name` to get the last name of a related author (To-One relationship).
* `name[].childname` - the name of a 'child' property inside each object in an array of objects. For example `blogs[].title` to get the title of all related blogs (To-Many relationship).

### Special properties

There are 3 special properties in the schema - `events`, `methods` and `properties`. Their values are objects which are passed in to the child components and 'bound' to the element/made available in the component.

`events` - These are attached to the underlying element via `v-on`. See `v-on object syntax` in the [Vue3 Directives](https://v3.vuejs.org/api/directives.html#v-on)
`methods` - These are made available to be called in the component JS.
`properties` - These are attached to the underlying element via `v-bind`. See `v-bind object syntax` in the [Vue3 Directives](https://v3.vuejs.org/api/directives.html#v-bind)

See the `AutocompleteInput` for an example of using these parameters.

## Components

There are 2 components in SLD:

1. `SLDRoot` - A `TabView` where each tab is a `SLDList`.
2. `SLDList` - A `DataTable`.

### Common Properties

All components take the following common properties:

* `configuration` - A `Configuration` schema object.

### SLDRoot

The `SLDRoot` component takes the following properties:

* `collections` - An object containing collections, keyed by collection name.

### SLDList

The `SLDList` component takes the following properties:

* `name` - The name of the generated table. This is used to identify the table, for example in `SLDRoot` tab titles.
* `collection` - An array of 'data' items.

### SLDDetail

The `SLDDetail` component is not usually called directly, being used inside a `Dialog` launched when a row is clicked on.

It takes the following properties:

* `name` - The name of the item being displayed (used in `Dialog` title).
* `item` - The object containing all the item's data.

## Widgets

Fields displayed in the SLDDetail can use a variety of widgets provided to display fields in different ways. The widget can be selected by setting `InputType` in the configuration schema.

The following widgets are available - mostly wrappers around PrimeVue components of the same/similar name:

* `BooleanInput`
* `DateInput`
* `AutocompleteInput`
* `TextInput`
* `TextareaInput`

### AutocompleteInput

This input is special in that it needs callbacks to provide the suggestions for autocompletion. The schema for an autocomplete field looks like:

```
{
  label: 'Blogs',
  field: 'blogs[].title',
  input: 'AutocompleteInput',
  events: {
    // Add a custom event for the input being blurred
    blur: {
      console.log('Input was blurred')
    }
  },
  properties: {
    // Property to extract from objects returned by onComplete function
    field: 'title',
    // If true, dialog uses 'Chips' multi-input format
    multiple: true,
  },
  methods: {
    // AutoCompleteInput expects there to be an onComplete method
    onComplete: (query) => {
      // Method must return an array of autocomplete suggestions.
      // If the 'field' property is set, objects must have that field to display
      // Otherwise a simple array of strings can be returned
      return [
        {
          title: 'One',
          value: 1,
        },
        {
          title: 'Two',
          value: 2,
        },
      ]
    },
  },
}
```

## Events

SLD generates events at various points in the UI. These are all sent to SLD's own `Event Bus`, built using [mitt]{https://github.com/developit/mitt}

To provide global access to the bus in your Vue app, do the following:

```
Vue.prototype.$sldbus = sld.bus
```

You can then access the bus in your own components as `this.$sldbus` or `$sldbus` inside the template.

Events are sent using the `emit` method, and listened to using the `on` method:

```
// SLD component
this.$sldbus.emit('message', 'Hello World')

// Your component
this.$sldbus.on('message', (msg) => console.log(msg))
```

If you don't want to have access to the bus 'globally' you can instead do the following in a specific component:

```
import { bus } from 'sld'
```

### Event Scoping

Since components may be reused, events can be scoped by setting the `name` property on a component, for example:

```
<SLDList :name="people" />
<SLDList :name="blogs" />
```

This is the default behaviour for SLDRoot, which sets `name` to be the collection key from the passed-in data.

This name will then be prepended to the event label, separated by a `:`

You can either listen for events within a specific component, e.g:

```
this.$sldbus.on('people:message', (msg) => console.log(msg))
```

Or you can use the wildcard `*` to listen for all events, and then filter on event label, e.g:

```
this.$sldbus.on('*', (label, msg) => {
  if label.startsWith('people:') {
    console.log(msg))
  }
}
```

### SLDRoot Events

* _activeTab_ - Active Tab event. Event passes the `collection_name` from the schema of the active/focused tab.

### SLDList Events

* _page_ - Pagination event. Event passes an object containing `offset` and `limit` values. Useful for dynamic data fetching/updating from an API.
* _load_ - Page load event. SLDList component has initialized.
* _reload_ - Page reload event. User has pressed the reload button, or part of the UI is requesting a refresh.
* _rowSelect_ - A row has ben selected. Event passes selected row's data object.

_Note_ - `:name` will be appended, if set.

### SLDDetail Events

* _update_ - Fires every time a field is updated (e.g. every keypress). Event is an array containing the original data object, and a new object containing the modified field.
* _blur_ - Field was updated, then lost focus (e.g. user clicked elsewhere). Event is an array containing original data object, and a new object containing the modified field.
* _save_ - Save button clicked. Event is an array containing the original data object, and a new object containing all modified properties.

_Note_ - `:name` of the 'parent' SLDList will be appended, if set.

These events allow for 3 different modes of operation when users edit your data. For example:

* Update a single field in your API on every keypress => _input_
* Update a single field in your API when the user switches to the next field => _blur_
* Update all changed fields in your API when the card is saved => _save_
