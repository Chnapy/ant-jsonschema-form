import * as React from "react";
import { SyntheticEvent } from "react";
import { WidgetProps } from "react-jsonschema-form";
import { JSONSchema6 } from "json-schema";
import { asNumber } from 'react-jsonschema-form/lib/utils';
import { Select } from "antd";
import { SelectProps, SelectValue } from "antd/lib/select";

type AntSelectWidgetProps = WidgetProps & {
    multiple?: boolean;
    options?: {
        enumOptions?: {
            label: string;
            value: string;
        }[];
        enumDisabled?: string[];
        props?: Partial<SelectProps>;
    };
};

const nums = new Set(["number", "integer"]);

export default class AntSelectWidget extends React.PureComponent<AntSelectWidgetProps> {

    constructor(props: AntSelectWidgetProps) {
        super(props);
    }

    /**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
    processValue(schema: JSONSchema6, value: SelectValue): SelectValue | boolean | undefined {
        // "enum" is a reserved word, so only "type" and "items" can be destructured
        const { type, items } = schema;
        if (value === "") {
            return undefined;
        } else if (type === "array" && items && typeof items === 'object' && nums.has((items as JSONSchema6).type as string)) {
            return (value as string[]).map(asNumber) as string[];
        } else if (type === "boolean") {
            return value === "true";
        } else if (type === "number") {
            return asNumber(value as string);
        }

        // If type is undefined, but an enum is present, try and infer the type from
        // the enum values
        if (schema.enum) {
            if (schema.enum.every((x: any) => !isNaN(x))) {
                return asNumber(value as string);
            } else if (schema.enum.every(x => typeof x === "boolean")) {
                return value === "true";
            }
        }

        return value;
    }

    getValue(event: SyntheticEvent<HTMLSelectElement>, multiple: boolean | undefined) {
        if (multiple) {
            return Array.from(event.currentTarget.options)
                .filter(o => o.selected)
                .map(o => o.value);
        } else {
            return event.currentTarget.value;
        }
    }

    render(): JSX.Element {

        const {
            schema,
            id,
            options,
            value,
            required,
            disabled,
            readonly,
            multiple,
            autofocus,
            onChange,
            onBlur,
            onFocus,
            placeholder
        } = this.props;

        const { enumOptions, enumDisabled } = options;
        const emptyValue = multiple ? [] : "";

        return (
            <Select
                id={id}
                mode={multiple ? 'multiple' : 'default'}
                value={typeof value === "undefined" ? emptyValue : value}
                disabled={disabled || readonly}
                autoFocus={autofocus}

                onBlur={
                    onBlur &&
                    ((values: SelectValue) => {
                        onBlur(id, this.processValue(schema, values) as string);
                    })
                }

                onChange={(values: SelectValue) => {
                    onChange(this.processValue(schema, values));
                }}

                {...options.props}
            >

                {!multiple && schema.default === undefined && (
                    <Select.Option >{placeholder}</Select.Option>
                )}
                {(enumOptions || []).map(({ value, label }, i) => {
                    const disabled = enumDisabled && enumDisabled.indexOf(value) != -1;
                    return (
                        <Select.Option key={i.toString()} value={value} disabled={disabled}>
                            {label}
                        </Select.Option>
                    );
                })}

            </Select>
        );
    }

}