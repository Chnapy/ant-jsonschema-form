import React from "react";
import { WidgetProps } from "react-jsonschema-form";
import CheckboxGroup, { CheckboxGroupProps, CheckboxOptionType, CheckboxValueType } from "antd/lib/checkbox/Group";

type AntCheckboxesWidgetProps = WidgetProps & {
    options?: {
        enumOptions?: {
            label: string;
            value: string;
        }[];
        enumDisabled?: string[];
        inline?: boolean;
        props?: Partial<CheckboxGroupProps>;
    };
};

export default class AntCheckboxesWidget extends React.PureComponent<AntCheckboxesWidgetProps> {

    constructor(props: AntCheckboxesWidgetProps) {
        super(props);
    }

    render(): JSX.Element {

        const { id, disabled, options, value, readonly, onChange } = this.props;
        const { enumOptions, enumDisabled, inline, props: checkboxProps } = options;

        const cbOptions: CheckboxOptionType[] = (enumOptions || []).map(option => {

            return {
                ...option,
                disabled: enumDisabled && enumDisabled.indexOf(option.value) != -1
            };
        });

        return (
            <CheckboxGroup
                disabled={disabled || readonly}
                value={value}
                options={cbOptions}
                onChange={(checkedValue: CheckboxValueType[]) => {
                    onChange(checkedValue);
                }}
                {...checkboxProps}
            />
        );
    }

}