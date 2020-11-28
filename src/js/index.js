import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'

import PickDate from './pick-date.js'

document.addEventListener('DOMContentLoaded', () => {
	const main = document.getElementById('main')
	ReactDOM.render(<App />, main)
})

function App(){
	const [date, setDate] = useState(new Date())
	return <div>
		<PickDate value={date} onChange={d => setDate(d)}/>
	</div>
}