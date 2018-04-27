import * as React from 'react';
import { LocalForm, Control } from 'react-redux-form';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

interface TokenAddressFormProps {
    submitForm(value: string);
}

interface TokenAddressFormState {
}

interface FormModel {
    value: string;
}

class TokenAddressForm extends React.Component<TokenAddressFormProps, TokenAddressFormState> {

    constructor(props: TokenAddressFormProps) {
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
                    <Label>Address</Label>
                    <Control.text
                        model=".value"
                        validators={{ required: (val) => val && val.length === 42 }}
                        component={Input}
                    />
                </FormGroup>
                <Button type="submit">Submit</Button>
            </LocalForm>
        );
    }
}

export default TokenAddressForm;