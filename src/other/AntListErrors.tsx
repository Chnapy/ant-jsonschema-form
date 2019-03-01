import React from "react";
import { ErrorListProps } from "react-jsonschema-form";

export default function AntListErrors(props: ErrorListProps) {
    const { errors } = props;

    return <>
        {(errors || []).map(error => (
            <div key={error.stack} className="ant-form-explain">{error.stack}</div>
        ))}
    </>;
}
