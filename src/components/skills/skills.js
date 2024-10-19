import { SKILL_LIST } from '../../consts'; 
import { useAttributes } from '../../attributesContext'; 
import './skills.css'

function SkillControl() {
    const { attributes, skillPoints, setSkillPoints } = useAttributes();

    const intelligenceModifier = Math.floor((attributes.Intelligence - 10) / 2);
    const totalPoints = 10 + (4 * intelligenceModifier);

    const handleIncrement = (skillName) => {
        if (skillPoints[skillName] < totalPoints) { 
            setSkillPoints(prev => ({
                ...prev,
                [skillName]: prev[skillName] + 1,
            }));
        }
    };

    const handleDecrement = (skillName) => {
        if (skillPoints[skillName] > 0) { 
            setSkillPoints(prev => ({
                ...prev,
                [skillName]: prev[skillName] - 1,
            }));
        }
    };

    return (
        <div>
            <h2>Skills</h2>
            <h3>Total Points Available: {totalPoints}</h3>
            {SKILL_LIST.map(skill => {
                const attributeModifier = Math.floor((attributes[skill.attributeModifier] - 10) / 2); 
                const totalSkillValue = skillPoints[skill.name] + attributeModifier; 

                return (
                    <div className='skillsRow' key={skill.name}>
                        <h4>{skill.name} - </h4>
                        <span>Points: {skillPoints[skill.name]} </span>
                        <button onClick={() => handleIncrement(skill.name)}>+</button>
                        <button onClick={() => handleDecrement(skill.name)}>-</button>
                        <span>Modifier ({skill.attributeModifier}): {attributeModifier}</span>
                        <span>Total: {totalSkillValue}</span>
                    </div>
                );
            })}
        </div>
    );
}

export default SkillControl;