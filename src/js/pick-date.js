import React, {useState, useEffect} from 'react'
import classNames from 'classnames'

const daysOfTheWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

export default function PickDate({onChange, min, max, value}){

	const selectedDate = withoutTime(value)

	const [inputYear, setInputYear] = useState('')
	const [inputMonth, setInputMonth] = useState('')
	const [viewDate, setViewDate] = useState(selectedDate)

	const viewYear = viewDate.getFullYear()
	const viewMonth = viewDate.getMonth()
	const firstDayOfTheWeek = (new Date(viewYear, viewMonth, 1)).getDay()
	const lastDay = (new Date(viewYear, viewMonth + 1, 0)).getDate()
	const weeks = Math.ceil((firstDayOfTheWeek + lastDay) / 7)
	const dividedMonthByWeek = Array.from(Array(weeks)).map((v, week) => {
		return Array.from(Array(7)).map((v, day) => {
			return new Date(viewYear, viewMonth, (week * 7 + day) - firstDayOfTheWeek + 1)
		})
	})

	const setViewYear = year => {
		const d = new Date(viewDate)
		d.setFullYear(year)
		setViewDate(d)
	}

	const setViewMonth = month => {
		const d = new Date(viewDate)
		d.setMonth(month)
		setViewDate(d)
	}

	useEffect(() => {
		setInputYear(viewYear)
	}, [viewYear])

	useEffect(() => {
		setInputMonth(viewMonth + 1)
	}, [viewMonth])

	useEffect(() => {
		setViewDate(selectedDate)
	}, [selectedDate.getTime()])

	return <div className="pick-date">
		<p>{`${selectedDate.getFullYear()}年${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日`}</p>
		<div className="year-container">
			<button className="prev-year-button" onClick={() => setViewYear(viewYear - 1)}>&lt;</button>
			<div className="input-container">
				<input className="input-year" type="text" value={inputYear} onChange={e => setInputYear(e.target.value)} onBlur={e => {
					const value = Number(e.target.value)
					if(value < 1900){
						setInputYear(viewYear)
					} else {
						setViewYear(value)
					}
				}} />
			</div>
			<button className="next-year-button" onClick={() => setViewYear(viewYear + 1)}>&gt;</button>
		</div>
		<div className="month-container">
			<button className="prev-month-button" onClick={() => setViewMonth(viewMonth - 1)}>&lt;</button>
			<div className="input-container">
				<input className="input-year" type="text" value={inputMonth} onChange={e => setInputMonth(e.target.value)} onBlur={e => {
					const value = Number(e.target.value) - 1
					if(value < 0 || value > 11){
						setInputMonth(viewMonth + 1)
					} else {
						setViewMonth(value)
					}
				}} />
			</div>
			<button className="next-month-button" onClick={() => setViewMonth(viewMonth + 1)}>&gt;</button>
		</div>
		<div className="date-table">
			<div className="days-of-the-week row">
				{
					daysOfTheWeek.map(day => <div className={classNames(day, 'cell')} key={day}>{day[0].toUpperCase()}</div>)
				}
			</div>
			{
				dividedMonthByWeek.map(week => {
					return <div className="week row" key={week}>
						{
							week.map(d => {
								return <div
									className={classNames('date', 'cell', daysOfTheWeek[d.getDay()], {
										'prev-month': d.getMonth() < viewMonth,
										'next-month': d.getMonth() > viewMonth,
										'selected': d.getTime() === selectedDate.getTime()
									})}
									key={d.getDay()}
									onClick={() => onChange(d)}>
									{d.getDate()}
								</div>
							})
						}
					</div>
				})
			}
		</div>
	</div>
}

function withoutTime(d){
	const date = new Date(0, d.getMonth(), d.getDate())
	date.setFullYear(d.getFullYear())
	return date
}