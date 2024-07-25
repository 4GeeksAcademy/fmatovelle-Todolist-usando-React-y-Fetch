import React, { useState, useEffect } from "react";
// import Styles from './styles';
// import Title from "./title";
// import Todos from "./todos";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [newEntry, setNewEntry] = useState('');
	const [taskList, setNewList] = useState([]);

	function handleSubmit(event) {
		event.preventDefault();
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				"label": newEntry,
				"is_done": false
			})
		};
		fetch("https://playground.4geeks.com/todo/todos/federico", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				getTasks()
				console.log(result)
				setNewEntry("")
			})
			.catch((error) => console.error(error));
	}
	console.log(taskList);
	const createUser = () => {
		const requestOptions = {
			method: "POST",
			redirect: "follow"
		};

		fetch("https://playground.4geeks.com/todo/users/federico", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				getTasks()
				console.log(result)
			})
			.catch((error) => console.error(error));
	}

	const getTasks = () => {
		const requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		fetch("https://playground.4geeks.com/todo/users/federico", requestOptions)
			.then((response) => {
				console.log(response);
				if (response.ok === false) {
					createUser()
				} else { return response.json() }
			})

			.then((result) => setNewList(result.todos))
			.catch((error) => console.error(error));
	}
	// getTasks()
	const deleteTask = (id) => {
		const requestOptions = {
			method: "DELETE",
			redirect: "follow"
		};

		fetch("https://playground.4geeks.com/todo/todos/" + id, requestOptions)
			.then((response) => response.text())
			.then((result) => {
				getTasks()
				console.log(result)
			})
			.catch((error) => console.error(error));

	}
	useEffect(() => {
		getTasks()
	}, [])

	return (
		<div className="container w-50">
			<h1>Todos</h1>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail" className="from-label"></label>
					<input
						placeholder="What needs to be done?"
						onChange={(event) => setNewEntry(event.target.value)}
						onKeyDown={(event) => {
							if (event.key === 'Enter') {
								handleSubmit(event)
							}
						}}
						value={newEntry}
					/>
				</div>

			</form>
			<ul className="todo">
				{
					taskList.map((task, index) => {
						return (

							<li key={index}>{task.label}{' '}
								<i 
									onClick={() => { deleteTask(task.id)}}
									className="fa-solid fa-trash">
								</i>
							</li>
							
								
							
						)
					})
				}

			</ul>
		</div>

	);
};

export default Home;
