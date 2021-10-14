import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

import AlertAsync from "react-native-alert-async";

interface showAlertProps {
	title: string;
	description: string;
	alertStyle: string;
}

const alertBox = async ({title, description, alertStyle}: showAlertProps) => {
	const choice = await AlertAsync(
		title,
		description,
		alertStyle === 'cancel' ? [
			{
				text: "Ok",
			},
		]
		:
		[
			{text: 'Yes', onPress: () => 'yes'},
			{text: 'No', onPress: () => Promise.resolve('no')},
		],
		{
			cancelable: true,
			onDismiss: () => 'no',
		},
	);

	if (choice === 'yes') return true;

};

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  async function handleAddTask(newTaskTitle: string) {	
		const newTask = {
			id: new Date().getTime(),
			title: newTaskTitle,
			done: false
		};

		const alreadyHaveTask = tasks.find(task => task.title === newTaskTitle);
		if (alreadyHaveTask !== undefined){
			const alertData = {
				title: "Task já cadastrada",
				description: "Voce não pode cadastrar uma task com o mesmo nome",
				alertStyle: "cancel"
			}
			alertBox(alertData);
			return;
		}

    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const filteredTasks = tasks.map(task =>
			task.id === id ? { ...task, done: !task.done } : task
		);
		setTasks(filteredTasks);
  }

  async function handleRemoveTask (id: number) {
		const alertData = {
			title: "Remover item",
			description: "Deseja realmente remover esse item?",
			alertStyle: "default"
		}

		const result = await alertBox(alertData);
		if(result)
    	setTasks(tasks.filter((value) => value.id !== id));
  }

	function handleEditTask(id: number, taskNewTitle: string){
		const newData = tasks.map(task => 
			task.id === id ? {...task, title: taskNewTitle} : task
		);

		setTasks(newData);
	}

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
				editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})