import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';
import { AntForm } from 'ant-jsonschema-form';
import { UiSchema } from 'react-jsonschema-form';
import { JSONSchema6 } from 'json-schema';

const uiSchema: UiSchema = {
    name: {
        "ui:options": {
            props: {
                placeholder: 'my name'
            }
        }
    },
    radio: {
        "ui:widget": "radio",
        // "ui:options": {
        //   props: {
        //   }
        // }
    },
    check: {
        "ui:widget": "checkboxes",
        //   "ui:options": {
        //     props: {
        //     }
        //   }
    }
};

const SAMPLE_SCHEMA_1: JSONSchema6 = { "type": "object", "$id": "TEST_ID", "required": ["age"], "properties": { "name": { "title": "Name", "type": "string" }, "age": { "description": "Entiers uniquement", "title": "Age", "type": "integer", "minimum": 18 }, "gender": { "type": "string", "enum": ["atttack helicopter", "man", "woman", "i'm not limited by some stupid attributes like gender"], "default": "atttack helicopter" }, "admin": { "type": "boolean" }, "radio": { "type": "boolean" }, "check": { "type": "array", "items": { "type": "string", "enum": ["choice 1", "choice 2"] }, "uniqueItems": true }, "array": { "type": "array", "title": "TOTO Array", "items": { "type": "string" } }, "date": { "type": "string", "format": "date" }, "dateTime": { "type": "string", "format": "date-time" } } };


ReactDOM.render(<AntForm
    schema={SAMPLE_SCHEMA_1}
    uiSchema={uiSchema}
    onSubmit={e => console.log('SUBMIT', e)}
    onChange={e => console.warn('CHANGE', e)}
    liveValidate={false}
    styleRoot
/>, document.getElementById('root'));
