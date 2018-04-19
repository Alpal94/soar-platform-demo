import * as React from 'react';
import { LocalForm, Control } from 'react-redux-form';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

interface ExampleFormEProps {
    submitForm(value: File);
}

interface ExampleFormState {
}

interface FormModel {
    files: any;
}

class ExampleForm extends React.Component<ExampleFormEProps, ExampleFormState> {

    constructor(props: ExampleFormEProps) {
        super(props);
    }

    handleSubmit(values: FormModel) {
        this.props.submitForm(values.files[0]);
    }

    public render(): React.ReactElement<{}> {
        return (
            <LocalForm
                className="form"
                onSubmit={(values) => this.handleSubmit(values)}
            >
                <FormGroup>
                    <Label>File</Label>
                    <Control.file id="file-input" model=".files" />
                </FormGroup>
                <Button type="submit">Submit</Button>
            </LocalForm>
        );
    }
}

export default ExampleForm;