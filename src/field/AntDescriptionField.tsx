import React from "react";
import { FieldProps } from "react-jsonschema-form";

interface AntDescriptionFieldProps extends Partial<FieldProps> {
    id?: string;
    description?: string | React.ReactElement;
}

export default class AntDescriptionField extends React.PureComponent<AntDescriptionFieldProps> {

    constructor(props: AntDescriptionFieldProps) {
        super(props);
    }

    render(): JSX.Element {
        const { id, description } = this.props;

        return <div id={id} className="ant-form-explain">{description}</div>

    }

}