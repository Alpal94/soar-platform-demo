import * as React from 'react';
import { LocalForm, Control } from 'react-redux-form';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

interface IndividualCapFormProps {
    submitForm(value: number);
}

interface IndividualCapFormState {
}

interface FormModel {
    value: number;
}

class IndividualCapForm extends React.Component<IndividualCapFormProps, IndividualCapFormState> {

    constructor(props: IndividualCapFormProps) {
        super(props);
    }

    handleSubmit(values: FormModel) {
        this.props.submitForm(values.value);
    }

    public render(): React.ReactElement<{}> {
        return (
            <LocalForm
                className="form"
                onSubmit={(values) => this.handleSubmit(values)}
            >
                <FormGroup>
                    <Label>Value</Label>
                    <Control.text
                        type="number"
                        model=".value"
                        validators={{ required: (val) => val && val > 0 }}
                        component={Input}
                    />
                </FormGroup>
                <Button type="submit">Submit</Button>
            </LocalForm>
        );
    }
}

export default IndividualCapForm;