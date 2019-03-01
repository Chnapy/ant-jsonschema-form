import * as React from "react";
import { ObjectFieldTemplateProps } from "react-jsonschema-form";
import { getUiOptions } from "react-jsonschema-form/lib/utils";
import { Card } from "antd";
import AntAddButton from "../other/AntAddButton";
import { JSONSchema6 } from "json-schema";
import { ID_PREFIX } from "../other/AntForm";

interface AntObjectFieldTemplateProps extends ObjectFieldTemplateProps {
    styleRoot?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    onAddClick?: (schema: JSONSchema6) => (e: React.MouseEvent) => void;
}

export default function AntObjectFieldTemplate(props: AntObjectFieldTemplateProps): JSX.Element {

    // console.log('object', props);

    function canExpand(): boolean {
        const { formData, schema, uiSchema } = props;
        if (!schema.additionalProperties) {
            return false;
        }
        const { expandable } = getUiOptions(uiSchema);
        if (expandable === false) {
            return expandable;
        }
        // if ui:options.expandable was not explicitly set to false, we can add
        // another property if we have not exceeded maxProperties yet
        if (schema.maxProperties !== undefined) {
            return Object.keys(formData).length < schema.maxProperties;
        }
        return true;
    };

    function isRoot(): boolean {
        return props.idSchema.$id === ID_PREFIX;
    }

    const title = props.uiSchema["ui:title"] || props.title;
    const description = props.description;

    const richTitle = (title || description) && <>
        {title && <>{title}<br /></>}
        {description && <small>{description}</small>}
    </>;

    const content = <>
        {props.properties.map(prop => prop.content)}

        {canExpand() && props.onAddClick && (
            <AntAddButton
                onClick={props.onAddClick(props.schema)}
                disabled={props.disabled || props.readonly}
            />
        )}
    </>;

    if (isRoot() && !props.styleRoot) {
        return content;
    }

    return (
        <Card id={props.idSchema.$id} title={richTitle}>

            {content}

        </Card>
    );
}
