import "./ToggleSwitch.css";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
import React, { useState } from "react";


const ToggleSwitch = () => {
	const [theme, setTheme] = useState('light');
	const themeToggler = () => {
	  theme === 'light' ? setTheme('dark') : setTheme('light')
	}
return (
	<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
	<>
	<GlobalStyles/>
	<div className="container">
	<div className="toggle-switch">
		<input type="checkbox" className="checkbox"
			name="dark-mode" id="dark-mode" onClick={themeToggler}/>
		<label className="label" htmlFor="dark-mode">
		<span className="inner" />
		<span className="switch" />
		</label>
	</div>
	</div>
	</>
	</ThemeProvider>
);
};

export default ToggleSwitch;
