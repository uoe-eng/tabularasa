# Tabularasa - A Table UI built using a schema.

`Tabularasa` is a Vue plugin which acts as a wrapper around a variety of [PrimeVue](https://www.primefaces.org/primevue/) widgets to provide a Search-List-Detail interface.

`tabularasa` takes in a `configuration` 'schema' (which defines the look and feel of the UI, and how data is presented), and `collections` data, which contains data items to be displayed.

`tabularasa` treats `collection` data as read-only. No changes are made to the passed-in object - instead, when data is edited, events are generated, containing the old and new data.

# Demo

A demo of tabularasa, using data generated by `Faker.js`. The source for this app is in `testapp/`

[Tabularasa - Test app](https://uoe-eng.github.io/tabularasa/)

# Installation

First create a new Vue app:

vue create <my-app>

Edit `src/main.js` adding the following before `new Vue` is called:

```
import * as tabularasa from 'tabularasa'
Vue.use(tabularasa)
```

# Demo

There is a `testapp` which demonstrates the use of `tabularasa`. This can be run by cloning this repository and then running:

```
# Install the package dependencies
yarn

# Run the demo
yarn serve
```

# Usage

## Configuration

### Data

`tabularasa` follows the convention of DataTable to expect data as an array of objects. These are referred to here as `collections` of `items`.

### Schema

`tabularasa` uses a configuration schema to configure the UI, and the presentation of the data. Where possible order in the schema will be preserved in the UI.

It takes the following structure:

```
{
  Collection_Name: {
    TRList: {
      fields: [
        label: 'Column header label',
        // Property in the data object. Can use dot-notation - e.g. 'author.surname' for nested objects.
        field: 'fieldName',
        component: 'CustomDisplay', // A custom widget used to display this field.
        properties: {
          // Properties to be passed direct to the 'Column' widget
        },
      ],
      filters: {
        // Fields to enable filtering on
        // Properties are optional but can be used to set initial filter state
        field: { value: null, matchMode: 'contains' },
      },
      properties: {
        // Properties to be passed direct to DataTable (for styling etc)
      },
    },
    TRDetail: {
      fields: [
        {
          label: 'Field label',
          // Property in the data object. Can use dot-notation - e.g. 'author.surname' for nested objects.
          field: 'fieldName',
          component: 'CustomInput', // A custom widget to be used to edit this field.
          properties: {
            // Properties to be passed direct to the Input (i.e. PrimeVue component config)
          }
          buttons: [
            // Buttons to add alongside each field
            {
              // button action added to event
              action: 'add',
              // primeicons icon name
              icon: 'plus',
              // Any other 'local' config to be included in the button event
              foo: 'bar',
            },
          ],
          events: {
            // Events to be passed direct to TRDetail's child components/inputs (for custom events)
          }
          methods: {
            // Methods to be passed direct to TRDetail's child components/inputs (for callbacks etc)
          }
          properties: {
            // Properties to be passed direct to TRDetail's child components/inputs (for styling etc)
          },
        },
      ],
      properties: {
        // Properties to pass to the 'whole' TRDetail card
      },
    },
  },
}
```
### Field values

The value of each `field` in `TRDetail.fields` can be specified in one of 4 ways:

* `name` - the name of a property in the object to be displayed.
* `name.childname` - the name of a nested 'child' property inside the 'parent' property. For example, `author.last_name` to get the last name of a related author (To-One relationship).
* `name[].childname` - the name of a 'child' property inside each object in an array of objects. For example `blogs[].title` to get the title of all related blogs (To-Many relationship).
* `name{}.childname` - the name of a 'child' property inside each object in a nested object. For example `blogs{}.title` to get the title of all related blogs (To-Many relationship).

Display and Input Components generally display either a single item, or a list of items. The former will fail with an error for fields containing `[]` or `{}`, the latter if the field does not contain these brackets.

### Special properties

There are 3 special properties in the schema - `events`, `methods` and `properties`. Their values are objects which are passed in to the child components and 'bound' to the element/made available in the component.

`events` - These are attached to the underlying element via `v-on`. See `v-on object syntax` in the [Vue3 Directives](https://v3.vuejs.org/api/directives.html#v-on)
`methods` - These are made available to be called in the component JS.
`properties` - These are attached to the underlying element via `v-bind`. See `v-bind object syntax` in the [Vue3 Directives](https://v3.vuejs.org/api/directives.html#v-bind)

See the `AutocompleteInput` for an example of using these parameters.

## Components

There are 3 components in `tabularasa`, though in most cases you only need to use the first 2:

1. `TRRoot` - A `TabView` where each tab is a `TRList`.
2. `TRList` - A `DataTable`.
3. `TRDialog` - A popup Dialog window containing a `TRDetail` card.
4. `TRDetail` - An editable form providing a view to a single row selected from the DataTable.


### Common Properties

All components take the following common properties:

* `configuration` - A `Configuration` schema object.

### TRRoot

The `TRRoot` component also takes the following properties:

* `collections` - An object containing collections, keyed by collection name.

### TRList

The `TRList` component also takes the following properties:

* `name` - The name of the generated table. This is used to identify the table, for example `TRRoot` will provide the tab title.
* `collection` - An array of 'data' items.

### TRDialog

The `TRDialog` component also takes the following properties:

* `header` - the dialog window title.
* `visible` - if the dialog should be shown or hidden.
* _Any of the properties to be passed to the `TRDetail` child component._

### TRDetail

The `TRDetail` component is not usually called directly, being used inside a `TRDialog` launched when a row is clicked on.

It takes the following properties:

* `dirty` - if set, the values passed in `item` will be added to the new `item` returned on `save`.
* `name` - The name of the item being displayed (used in `Dialog` title).
* `item` - The object containing all the item's data.

Each TRDetail consists of rows containing a `label`, `field` (widget), and optional buttons.

## Buttons

TRDetail cards can have `buttons` displayed alongside each field. These are configurable in the schema, and require the following properties:

* `action` - the button name, added to the button `event`.
* `icon` - the name of a [primeicon](https://www.primefaces.org/primevue/#/icons) icon (excluding the `pi- prefix`).
* _Any other 'local' properties that are needed by the event handler._

An example `buttons` entry in the schema:

```
buttons: [
  {
    icon: 'plus',
    action: 'add',
    name: 'Email',
    foo: 'bar',
  }
]
```

Clicking on this button will generate an event. for example, if the above config was added in the schema to a `Email` field, in a `Person` card, the result would be:

`TRDetail:button:Email`
```
{
  button: { // the button config from the schema
    icon: 'plus',
    action: 'add',
    name: 'Email',
    foo: 'bar',
  }
  cardName: "Person", // the `name` property of the TRDetail card.
  field: 'email', // the `fieldName` of the widget associated with this button.
  item: 'none@example.com', // the current value of the widget associated with this button.
}
```

## Widgets

Fields displayed in the TRDetail can use a variety of widgets provided to display fields in different ways. The widget can be selected by setting `InputType` in the configuration schema.

The following widgets are available - mostly wrappers around PrimeVue components of the same/similar name:

* `BooleanDisplay` - Display true/false as a checkbox
* `ChipsDisplay` - Display multiple items as 'chips'
* `AutocompleteInput` - Display single or multiple items as text or 'chips'
* `BooleanInput` - Input true/false as a checkbox
* `DateInput` - Input with a calendar date picker
* `NumberInput` - Input number/currency strings
* `TextInput` - Input text strings
* `TextareaInput` - Input text boxes (for long strings)

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

`tabularasa` generates events at various points in the UI. These are all sent to TR's own `Event Bus`, built using [mitt]{https://github.com/developit/mitt}

To provide global access to the bus in your Vue app, do the following:

```
app.provide('trBus, tabularasa.trBus)
```

You can then access the bus in your own components by injecting it:

```
import { inject } from 'vue'
inject('trBus')
```

Events are sent using the `emit` method, and listened to using the `on` method:

```
// tabularasa component
trBus.emit('message', 'Hello World')

// Your component
trBus.on('message', (msg) => console.log(msg))
```

If you don't want to have access to the bus 'globally' you can instead do the following in a specific component:

```
import { trBus } from 'tabularasa'
```

### Event Scoping

Since components may be reused, events can be scoped by setting the `name` property on a component, for example:

```
<TRList :name="people" />
<TRList :name="blogs" />
```

This is the default behaviour for TRRoot, which sets `name` on child `TRList` components to be the collection key from the passed-in data.

This name will then be prepended to the event label, separated by a `:`.

You can either listen for events within a specific component, e.g:

```
trBus.on('TRRoot:activeTab', (name) => console.log(name))
```

Or you can use the wildcard `*` to listen for all events, and then filter on event label, e.g:

```
trBus.on('*', (label, msg) => {
  if label.includes(':save:') {
    console.log('Saved'))
  }
}
```

### TRRoot Events

* _activeTab_ - Active Tab event. Event passes the `collection_name` from the schema of the active/focused tab.

### TRList Events

* _page_ - Pagination event. Event passes an object containing `offset` and `limit` values. Useful for dynamic data fetching/updating from an API.
* _load_ - Page load event. TRList component has initialized.
* _reload_ - Page reload event. User has pressed the reload button, or part of the UI is requesting a refresh.
* _rowSelect_ - A row has ben selected. Event passes selected row's data object.

_Note_ - `:name` will be appended, if set.

### TRDetail Events

* _update_ - Fires every time a field is updated (e.g. every keypress). Event is an array containing the original data object, and a new object containing the modified field.
* _blur_ - Field was updated, then lost focus (e.g. user clicked elsewhere). Event is an array containing original data object, and a new object containing the modified field.
* _save_ - Save button clicked. Event is an array containing the original data object, and a new object containing all modified properties.

_Note_ - `:name` of the 'parent' TRList will be appended, if set.

These events allow for 3 different modes of operation when users edit your data. For example:

* Update a single field in your API on every keypress => _update_
* Update a single field in your API when the user switches to the next field => _blur_
* Update all changed fields in your API when the 'card' is saved => _save_
