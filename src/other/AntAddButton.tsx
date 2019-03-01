import React from "react";
import FormItem from "antd/lib/form/FormItem";
import { Button } from "antd";
import { TextAlignProperty } from "csstype";

export interface AntAddButtonProps {
    // className?: string;
    onClick: (e: React.MouseEvent) => void;
    disabled?: boolean;
    align?: TextAlignProperty;
    children?: React.ReactNode;
}

export default function AntAddButton(props: AntAddButtonProps) {

    const {
        onClick,
        disabled = false,
        align,
        children
    } = props;

    const style: React.CSSProperties = {
        textAlign: align
    };

    return (
        <FormItem help={true} style={style}>
            <Button type="dashed" onClick={onClick} icon={'plus'} disabled={disabled}>
                {children}
            </Button>
        </FormItem>
    );
}