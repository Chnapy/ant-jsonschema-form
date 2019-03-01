import * as React from "react";
import { ChangeEvent } from "react";
import { WidgetProps } from "react-jsonschema-form";
import { Input } from "antd";
import { InputProps } from "antd/lib/input";

type AntTextWidgetProps = WidgetProps & {
    rawErrors?: any;
    options?: {
        props?: Partial<InputProps>;
    };
};

export default class AntTextWidget extends React.PureComponent<AntTextWidgetProps> {

    constructor(props: AntTextWidgetProps) {
        super(props);
    }

    onChange = (e: ChangeEvent<HTMLInputElement>) => {

        const {
            onChange,
            options
        } = this.props;

        const { value } = e.currentTarget;
        return onChange(value === "" ? (options as any).emptyValue : value);
    };

    render(): JSX.Element {

        const {
            value,
            readonly,
            disabled,
            autofocus,
            onBlur,
            onFocus,
            options,
            schema,
            formContext,
            rawErrors,
            ...inputProps
        } = this.props;

        return (
            <Input
                type={(options as any).inputType || (inputProps as any).type || "text"}
                readOnly={readonly}
                disabled={disabled}
                autoFocus={autofocus}
                value={value == null ? "" : value}
                onChange={this.onChange}
                onBlur={onBlur && (event => (onBlur as any)(inputProps.id, event.target.value))}
                onFocus={onFocus && (event => (onFocus as any)(inputProps.id, event.target.value))}
                {...options.props}
            />
        );
    }

}