import * as React from 'react';

interface SelectLanguageProps {
    currentLanguage: string;
    languages: string[];
    onLanguageSelected: (event: any) => void;
}

const SelectLanguage: React.SFC<SelectLanguageProps> = (props) => {

    return (
        <select onChange={props.onLanguageSelected}>
           {props.languages.map((language, index) =>
                <option value={language} key={index}>{language}</option>
            )}
        </select>
    );
};

export default SelectLanguage;