import React from 'react'
import { AntForm } from 'ant-jsonschema-form'
import { UiSchema } from 'react-jsonschema-form'
import { JSONSchema6 } from 'json-schema'
import DataManager from './DataManager'

export interface AppProps {
  schema: any;
  uiSchema: any;
  onChange: any;
}

export default class App extends React.Component<AppProps, AppProps> {

  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
  }


  render(): React.ReactNode {
    const {schema, uiSchema, onChange} = this.state;

    console.log('RENDER', schema);

    return <AntForm
      schema={schema}
      uiSchema={uiSchema}
      onSubmit={e => console.log('SUBMIT', e)}
      onChange={onChange}
      liveValidate={false}
      styleRoot
    />;
  }

}
