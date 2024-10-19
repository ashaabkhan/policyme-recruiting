import { ATTRIBUTE_LIST } from '../../consts';
import { useAttributes } from '../../attributesContext';
import './attributes.css'

function AttributeControl() {
    const { attributes, setAttributes } = useAttributes();
    const totalAttributes = Object.values(attributes).reduce((acc, val) => acc + val, 0);
    const TOTAL_POINTS = 70

    function handleIncrement(attribute) {
        if (totalAttributes >= TOTAL_POINTS) {
            alert("You must decrease another attribute before increasing this one.");
            return;
        }

        setAttributes(prev => ({
            ...prev,
            [attribute]: prev[attribute] + 1,
        }));
    }

    function handleDecrement(attribute) {
        setAttributes(prev => ({
            ...prev,
            [attribute]: prev[attribute] > 0 ? prev[attribute] - 1 : 0,
        }));
    }

    function calculateModifier(attributeValue) {
        return Math.floor((attributeValue - 10) / 2);
    }

    return (
        <div>
            {ATTRIBUTE_LIST.map(attribute => (
                <div key={attribute} className='attributeContainer'>
                    <h3 className='attributeName'>{attribute}</h3>
                    <button onClick={() => handleDecrement(attribute)}>–</button>
                    <span className='attributeValue'>{attributes[attribute]}</span>
                    <button onClick={() => handleIncrement(attribute)}>+</button>
                    <span> | Modifier: {calculateModifier(attributes[attribute])}</span>
                </div>
            ))}
        </div>
    );
}

export default AttributeControl;
