import { useAttributes } from './attributesContext';

const API_URL = `https://recruiting.verylongdomaintotestwith.ca/api/ashaabkhan/character`;

export async function saveCharacter(characterData) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(characterData),
        });

        if (!response.ok) {
            throw new Error("Failed to save character");
        }

        console.log("Character saved successfully", characterData);
    } catch (error) {
        console.error(error);
    }
}

export async function loadCharacter() {
    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to load character");
        }

        const characterData = await response.json();
        console.log('loaded character', characterData)
        return characterData;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function SaveControl () {
    const { saveCharacterData } = useAttributes();
    return (
        <div>
            <button onClick={() => saveCharacterData()}>Save</button>
        </div>
    );
}