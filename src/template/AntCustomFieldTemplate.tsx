import * as React from 'react';
import { FieldTemplateProps } from "react-jsonschema-form";
import FormItem from "antd/lib/form/FormItem";
import AntErrors from "../other/AntErrors";


export default function AntCustomFieldTemplate(props: FieldTemplateProps): JSX.Element {
    const { id, classNames, required, label, description, errors, help, children, schema } = props;

    if (!props.displayLabel) {

        return children;

    } else {

        return <FormItem className={classNames} label={label} required={required || !!schema.required} help={description}>

            {children}
            <AntErrors {...props} />
            {help || undefined}

        </FormItem>;

    }
};