import React from "react";
import { Form, Button } from "antd";
import RJSFFORM, { FormProps, Widget, Field, FieldProps } from 'react-jsonschema-form';
import { FormComponentProps } from "antd/lib/form";
import AntTextWidget from "../widget/AntTextWidget";
import AntDescriptionField from "../field/AntDescriptionField";
import classnames from 'classnames';
import AntListErrors from "./AntListErrors";
import AntSelectWidget from "../widget/AntSelectWidget";
import AntCheckboxWidget from "../widget/AntCheckboxWidget";
import AntCheckboxesWidget from "../widget/AntCheckboxesWidget";
import AntRadioWidget from "../widget/AntRadioWidget";
import AntArrayFieldTemplate from "../template/AntArrayFieldTemplate";
import AntDateWidget from "../widget/AntDateWidget";
import AntObjectFieldTemplate from "../template/AntObjectFieldTemplate";
import AntCustomFieldTemplate from "../template/AntCustomFieldTemplate";

export const ID_PREFIX = 'rjsf';

const _fields: { [name: string]: Field | React.ComponentClass<FieldProps & any>; } = {

    DescriptionField: AntDescriptionField

};

const _widgets: { [name: string]: Widget; } = {

    TextWidget: AntTextWidget,
    SelectWidget: AntSelectWidget,
    CheckboxWidget: AntCheckboxWidget,
    CheckboxesWidget: AntCheckboxesWidget,
    RadioWidget: AntRadioWidget,
    DateWidget: AntDateWidget,
    DateTimeWidget: (props) => <AntDateWidget {...props} showTime />

};

interface AntFormProps extends FormComponentProps, FormProps<any> {
    styleRoot?: boolean;
    formAlign?: 'vertical' | 'horizontal' | 'inline';
}

const AntForm = Form.create()(
    class extends React.PureComponent<AntFormProps> {

        render(): JSX.Element {

            const { schema, fields: newFields, widgets: newWidgets, styleRoot, children, form,
                formAlign = 'vertical'
            } = this.props;

            // console.log(this.props);

            const fields = {
                ..._fields,
                ...(newFields || {})
            };

            const widgets = {
                ..._widgets,
                ...(newWidgets || {})
            };

            return (
                <RJSFFORM
                    idPrefix={ID_PREFIX}
                    className={classnames(
                        'ant-form-' + formAlign
                    )}
                    schema={schema}
                    fields={fields}
                    widgets={widgets}
                    FieldTemplate={AntCustomFieldTemplate}
                    ArrayFieldTemplate={AntArrayFieldTemplate}
                    ObjectFieldTemplate={props => <AntObjectFieldTemplate {...props} styleRoot={styleRoot} />}
                    ErrorList={AntListErrors}
                    liveValidate
                    {...this.props}
                >
                    {
                        children != null
                            ? children
                            : <Button type="primary" htmlType="submit">Submit</Button>
                    }
                </RJSFFORM>
            );

        }

    });

export default AntForm;