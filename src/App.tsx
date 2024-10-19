import './App.css';
import { ContextProvider } from './attributesContext';
import AttributeControl from './components/attributes/attributes'
import ClassControl from './components/classes/classes';
import SkillControl from './components/skills/skills';
import { SaveControl } from './Api'

function App() {
	return (
		<ContextProvider>
			<div className="App">
				<header className="App-header">
					<h1>React Coding Exercise</h1>
					<SaveControl />
				</header>
				<section className="App-section">
					<AttributeControl />
					<ClassControl />
					<SkillControl />
				</section>
			</div>
		</ContextProvider>
	);
}

export default App;
