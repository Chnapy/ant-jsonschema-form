import * as React from "react";
import { ArrayFieldTemplateProps } from "react-jsonschema-form";
import AntAddButton from "../other/AntAddButton";
import AntArrayItem from "../other/AntArrayItem";
import FormItem from "antd/lib/form/FormItem";

interface AntArrayFieldTemplateProps extends ArrayFieldTemplateProps {

}

export default function AntArrayFieldTemplate(props: AntArrayFieldTemplateProps): JSX.Element {

    const {
        schema,
        uiSchema,
        idSchema,
        title = props.uiSchema["ui:title"],
        required,
        items,
        disabled,
        readonly,
        canAdd,
        onAddClick,
        className
    } = props;

    return (
        <FormItem className={className} label={title} required={required || !!schema.required} help={uiSchema["ui:description"] || schema.description || true}>

            {items && items.map(ip => <AntArrayItem {...ip} key={ip.index} />)}

            {canAdd && (
                <AntAddButton
                    onClick={onAddClick}
                    disabled={disabled || readonly}
                    align={'right'}
                />
            )}
        </FormItem>
    );
}
