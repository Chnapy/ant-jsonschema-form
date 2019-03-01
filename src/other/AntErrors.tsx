import React from "react";
import { FieldTemplateProps } from "react-jsonschema-form";

interface AntErrorProps extends FieldTemplateProps {
}

export default class AntErrors extends React.PureComponent<AntErrorProps> {

    constructor(props: AntErrorProps) {
        super(props);
    }

    render(): JSX.Element[] {
        const { rawErrors } = this.props;

        return (rawErrors || []).map(error => (
            <div key={error} className="ant-form-explain">{error}</div>
        ));
    }

}