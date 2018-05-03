import * as React from 'react';
import Strings from '../../locale/strings';

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

    handleSelectLanguage = (event: any) => {
        this.setState({selectedLanguage: event.target.value});
        this.props.onLanguageSelected(event.target.value);
    }

    public render(): React.ReactElement<{}> {
        let currentLanguage = Strings.getInterfaceLanguage();
        let availableLanguage = Strings.getAvailableLanguages();

        return (
            <select onChange={this.handleSelectLanguage} value={this.state.selectedLanguage}>
                {availableLanguage.map((language, index) =>
                    <option value={language} key={index}>{language}</option>
                )}
            </select>
        );
    }
}

export default SelectLanguage;