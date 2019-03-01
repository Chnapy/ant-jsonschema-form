import React from "react";
import { WidgetProps } from "react-jsonschema-form";
import Checkbox, { CheckboxProps } from "antd/lib/checkbox";

type AntCheckboxWidgetProps = WidgetProps & {
    label?: string;
    options?: {
        props?: Partial<CheckboxProps>;
    };
};

export default class AntCheckboxWidget extends React.PureComponent<AntCheckboxWidgetProps> {

    constructor(props: AntCheckboxWidgetProps) {
        super(props);
    }

    render(): JSX.Element {

        const {
            value,
            disabled,
            readonly,
            label,
            onChange,
            options: { props: checkboxProps }
        } = this.props;

        return (
            <Checkbox
                onChange={event => onChange(event.target.checked)}
                checked={typeof value === "undefined" ? false : value}
                disabled={disabled || readonly}
                {...checkboxProps}
            >
                {label}
            </Checkbox>
        );
    }

}