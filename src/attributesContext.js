import { createContext, useContext, useState, useEffect } from 'react';
import { ATTRIBUTE_LIST, SKILL_LIST } from './consts';
import { saveCharacter, loadCharacter } from './Api';

const attributesContext = createContext();

export const ContextProvider = ({ children }) => {
    const initialState = ATTRIBUTE_LIST.reduce((acc, attribute) => {
        acc[attribute] = 10; 
        return acc;
    }, {});

    const initialSkillPoints = SKILL_LIST.reduce((acc, skill) => {
        acc[skill.name] = 0; 
        return acc;
    }, {});

    const [attributes, setAttributes] = useState(initialState);
    const [skillPoints, setSkillPoints] = useState(initialSkillPoints);

    const saveCharacterData = () => {
        const characterData = { attributes, skillPoints };
        saveCharacter(characterData);
    };

    useEffect(() => {
        const fetchCharacterData = async () => {
            const loadedCharacter = await loadCharacter();
            const loadedCharacterBodyLength = Object.keys(loadedCharacter.body).length;
            if (loadedCharacter?.body && loadedCharacterBodyLength > 0) {
                setAttributes(loadedCharacter.body.attributes);
            }
        };
        fetchCharacterData();
    }, []);

    return (
        <div>
            <attributesContext.Provider value={{ attributes, setAttributes, skillPoints, setSkillPoints, saveCharacterData }}>
                {children}
            </attributesContext.Provider>
        </div>
    );
};

export const useAttributes = () => {
    return useContext(attributesContext);
};