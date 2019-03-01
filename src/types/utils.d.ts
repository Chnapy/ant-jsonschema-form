import { UiSchema } from "react-jsonschema-form";
import { JSONSchema6 } from 'json-schema';


declare module 'react-jsonschema-form/lib/utils' {

    export function isMultiSelect(schema: JSONSchema6, definitions: any): boolean;

    export function getDefaultRegistry(): {
        fields: any[];
        widgets: any[];
        definitions: object;
        formContext: object;
    };

    export function getUiOptions(uiSchema: UiSchema): any;

    export function asNumber(value: any): any;

}