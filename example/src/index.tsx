import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { UiSchema } from 'react-jsonschema-form'
import DataManager from './DataManager'
import App from './App'

const dataManager = new DataManager()

const uiSchema: UiSchema = {
  name: {
    'ui:options': {
      props: {
        placeholder: 'my name'
      }
    }
  },
  radio: {
    'ui:widget': 'radio'
    // "ui:options": {
    //   props: {
    //   }
    // }
  },
  check: {
    'ui:widget': 'checkboxes'
    //   "ui:options": {
    //     props: {
    //     }
    //   }
  },
  secteurs: {
    dex: {
    }
  }
}

const SAMPLE_SCHEMA_1 = {
  'type': 'object',
  '$id': 'TEST_ID',
  'required': ['age'],
  'properties': {
    'name': {
      'title': 'Name',
      'type': 'string'
    },
    'age': {
      'description': 'Entiers uniquement',
      'title': 'Age',
      'type': 'integer',
      'minimum': 18
    },
    'gender': {
      'type': 'string',
      'enum': ['atttack helicopter', 'man', 'woman', 'i\'m not limited by some stupid attributes like gender'],
      'default': 'atttack helicopter'
    },
    'admin': { 'type': 'boolean' },
    'radio': { 'type': 'boolean' },
    'check': { 'type': 'array', 'items': { 'type': 'string', 'enum': ['choice 1', 'choice 2'] }, 'uniqueItems': true },
    'array': { 'type': 'array', 'title': 'TOTO Array', 'items': { 'type': 'string' } },
    'date': { 'type': 'string', 'format': 'date' },
    'dateTime': { 'type': 'string', 'format': 'date-time' },
    'secteurs': {
      'type': 'object',
      'properties': {
        'dex': {
          'type': 'string',
          'title': 'DEX',
          'enum': ['toto'],
          'default': 'toto'
        },
        'dep': {
          'type': 'string',
          'title': 'DEP',
          'enum': ['toto'],
          'default': 'toto'
        },
        'dir': {
          'type': 'string',
          'title': 'DIR',
          'enum': ['toto'],
          'default': 'toto'
        }
      }

    }
  }
}

let loaded = false;

const onChange = (data) => {
  console.log('CHANGE', data);

  if(!loaded) return;

  const { secteurs: { dex, dep, dir } } = data.formData;

  dataManager.filter('dex',dex);
  dataManager.filter('dep',dep);
  dataManager.filter('dir',dir);

  refresh({dex, dep, dir});
};

let app: App

ReactDOM.render(<App
  ref={a => a ? app = a : null}
  schema={SAMPLE_SCHEMA_1}
  uiSchema={uiSchema}
  onChange={onChange}
/>, document.getElementById('root'))


dataManager.init().then(() => {

  console.log('DATAMANAGER', dataManager);

  refresh();

  loaded = true;

})

function refresh(props: {dex?: string, dep?: string, dir?: string} = {}) {
  const { dex, dep, dir } = SAMPLE_SCHEMA_1.properties.secteurs.properties

  dex.enum = dataManager.groupDEX.map(d => d.key)
  dex.default = props.dex || ''//dex.enum[0]

  dep.enum = dataManager.groupDEP.map(d => d.key)
  dep.default = props.dep || ''//dep.enum[0]

  dir.enum = dataManager.groupDIR.map(d => d.key)
  dir.default = props.dir || ''//dir.enum[0]

  app.setState({
    schema: SAMPLE_SCHEMA_1
  })

  console.log('SET STATE', dex, dep, dir)
}
