import * as React from "react";
import { WidgetProps } from "react-jsonschema-form";
import { CheckboxOptionType } from "antd/lib/checkbox";
import Radio, { RadioGroupProps, RadioChangeEvent } from "antd/lib/radio";

type AntRadioWidgetProps = WidgetProps & {
    label?: string;
    options?: {
        enumOptions?: {
            label: string;
            value: string;
        }[];
        enumDisabled?: string[];
        inline?: boolean;
        props?: Partial<RadioGroupProps>;
    };
};

export default class AntRadioWidget extends React.PureComponent<AntRadioWidgetProps> {

    constructor(props: AntRadioWidgetProps) {
        super(props);
    }

    render(): JSX.Element {

        const { id, disabled, options, value, readonly, onChange } = this.props;
        const { enumOptions, enumDisabled, inline, props: radioProps } = options;

        const cbOptions: CheckboxOptionType[] = (enumOptions || []).map(option => {

            return {
                ...option,
                disabled: enumDisabled && enumDisabled.indexOf(option.value) != -1
            };
        });

        return (
            <Radio.Group
                disabled={disabled || readonly}
                value={value}
                options={cbOptions}
                onChange={(e: RadioChangeEvent) => {
                    onChange(e.target.value);
                }}
                {...radioProps}
            />
        );
    }

}