import * as React from 'react';
import Strings from '../../locale/strings';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';

interface SelectLanguageState {
    selectedLanguage: string;
}

interface SelectLanguageProps {
    onLanguageSelected: (event: any) => void;
}

class SelectLanguage extends React.Component<SelectLanguageProps, SelectLanguageState> {

    componentWillMount() {
        this.setState({
            selectedLanguage: Strings.getInterfaceLanguage()
        });
    }

    handleSelectLanguage = (languageCode: string) => {
        // `react-flag-select` uses country codes but `redux-localization` uses language codes
        // You need to map between them here to support new languages

        var language = 'en';
        if (languageCode === 'CN') { language = 'zh'; }
        this.setState({selectedLanguage: language});
        this.props.onLanguageSelected(language);
    }

    public render(): React.ReactElement<{}> {
        let currentLanguage = Strings.getInterfaceLanguage();
        let availableLanguage = Strings.getAvailableLanguages();

        return (
            <ReactFlagsSelect 
                countries={['US', 'CN']}
                defaultCountry="US"
                placeholder="Select Language" 
                showSelectedLabel={false} 
                showOptionLabel={false} 
                selectedSize={14} 
                optionsSize={14} 
                onSelect={this.handleSelectLanguage}
            />
        );
    }
}

export default SelectLanguage;