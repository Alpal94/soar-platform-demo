import * as React from 'react';
import { LocalForm, Control } from 'react-redux-form';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { PricingFormModel } from '../../../containers/Admin/model';

interface PricingFormProps {
    submitForm(model: PricingFormModel);
}

interface PricingFormState {
}

interface FormModel {
    geohashes: string;
    price: number;
    precision: number;

}

class PricingForm extends React.Component<PricingFormProps, PricingFormState> {

    constructor(props: PricingFormProps) {
        super(props);
    }

    handleSubmit(values: FormModel) {
        let array : string[] = values.geohashes.split(',');
        let model : PricingFormModel = {
            geohashes: array,
            price: values.price,
            precision: values.precision
        }
        this.props.submitForm(model);
    }

    public render(): React.ReactElement<{}> {
        return (
            <LocalForm
                className="form"
                onSubmit={(values) => this.handleSubmit(values)}
            >
                <FormGroup>
                    <Label>Geohashes</Label>
                    <Control.textarea
                        model=".geohashes"
                        validators={{ required: (val) => val }}
                        component={Input}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Price</Label>
                    <Control.text
                        model=".price"
                        // type="number"
                        validators={{ required: (val) => val && val > 0 }}
                        component={Input}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Precision</Label>
                    <Control.text
                        model=".precision"
                        type="number"
                        validators={{ required: (val) => val && val >= 2 && val <= 7 }}
                        component={Input}
                    />
                </FormGroup>
                <Button type="submit">Submit</Button>
            </LocalForm>
        );
    }
}

export default PricingForm;