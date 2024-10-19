import { useState } from 'react';
import { CLASS_LIST } from '../../consts';
import { useAttributes } from '../../attributesContext';
import './classes.css'

function ClassControl () {
    const { attributes } = useAttributes();
    const [selectedClass, setSelectedClass] = useState();

    function isClassAvailable(className) {
        const classRequirements = CLASS_LIST[className];
        return Object.keys(classRequirements).every(attribute => {
            return attributes[attribute] >= classRequirements[attribute]
        });
    }

    function handleClassClick(className) {
        setSelectedClass(className); 
    }

    const classList = Object.keys(CLASS_LIST).map((classListItem) => <li onClick={() => handleClassClick(classListItem)} className={isClassAvailable(classListItem) ? 'available' : ''}>{classListItem}</li>);
   
    return (
        <div>
            Classes
            <div>{classList}</div>
            {selectedClass && (
                <div>
                    <h3>{selectedClass} Minimum Requirements:</h3>
                    <ul>
                        {Object.entries(CLASS_LIST[selectedClass]).map(([attribute, minValue]) => (
                            <li key={attribute}>
                                {attribute}: {minValue}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>        
    );
}

export default ClassControl