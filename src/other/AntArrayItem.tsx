import * as React from "react";
import { ArrayFieldTemplateProps } from "react-jsonschema-form";
import FormItem from "antd/lib/form/FormItem";
import { Row, Col, Button } from "antd";
import ButtonGroup from "antd/lib/button/button-group";

export type AntArrayItemProps = ArrayFieldTemplateProps['items'][0];

export default function AntArrayItem(props: AntArrayItemProps): React.ReactElement {

    return (
        <FormItem className={props.className} help={true}>
            <Row type="flex" justify="start" gutter={16}>

                <Col>
                    {props.children}
                </Col>

                {props.hasToolbar && (
                    <Col>

                        <ButtonGroup>

                            {(props.hasMoveUp || props.hasMoveDown) && (
                                <>
                                    <Button
                                        icon="arrow-up"
                                        type="default"
                                        disabled={props.disabled || props.readonly || !props.hasMoveUp}
                                        onClick={props.onReorderClick(props.index, props.index - 1)}
                                    />
                                    <Button
                                        icon="arrow-down"
                                        type="default"
                                        disabled={props.disabled || props.readonly || !props.hasMoveDown}
                                        onClick={props.onReorderClick(props.index, props.index + 1)}
                                    />
                                </>
                            )}

                            {props.hasRemove && (
                                <Button
                                    icon="minus-circle-o"
                                    type={'danger'}
                                    disabled={props.disabled || props.readonly}
                                    onClick={props.onDropIndexClick(props.index)}
                                />
                            )}

                        </ButtonGroup>

                    </Col>
                )}

            </Row>
        </FormItem>
    );
}