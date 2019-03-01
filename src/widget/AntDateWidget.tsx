import * as React from "react";
import { WidgetProps } from "react-jsonschema-form";
import { DatePickerProps } from "antd/lib/date-picker/interface";
import { DatePicker } from "antd";

type AntDateWidgetProps = WidgetProps & {
    showTime?: boolean;
    options?: {
        props?: Partial<DatePickerProps>;
    };
};

export default class AntDateWidget extends React.PureComponent<AntDateWidgetProps> {

    constructor(props: AntDateWidgetProps) {
        super(props);
    }

    render(): JSX.Element {

        const {
            showTime,
            onChange,
            options
        } = this.props;

        const format = 'DD/MM/YYYY' + (showTime
            ? ' : HH:mm'
            : '');

        return <DatePicker
            showTime={showTime}
            onChange={onChange}
            format={format}
            {...options.props}
        />
    }

}