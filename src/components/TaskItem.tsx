import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Task } from './TasksList';

import React, { useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';
import rectangleIcon from '../assets/icons/rectangle.png';
import xIcon from '../assets/icons/delete/x.png';

interface TasksListProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
	editTask: (id: number, taskNewTitle: string) => void;
}

export function TaskItem({ task, toggleTaskDone, removeTask, editTask }: TasksListProps) {

	const [ editing, setEditing ] = useState(false);
	const [ title, setTitle ] = useState(task.title);
	const textInputRef = useRef<TextInput>(null);

	function handleStartEditing() {
		setEditing(true);
	}

	function handleCancelEditing() {
		setTitle(task.title);
		setEditing(false);
	}

	function handleSubmitEditing() {
		editTask(task.id, title);
		setEditing(false);
	}

	useEffect(() => {
    if (textInputRef.current) {
      if (editing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [editing])

	return (
		<>
			<View>
				<TouchableOpacity
					activeOpacity={0.7}
					style={styles.taskButton}
					//TODO - use onPress (toggle task) prop
					onPress={() => toggleTaskDone(task.id)}
				>
					<View 
						style={task.done ? styles.taskMarkerDone : styles.taskMarker}
					>
						{ task.done && (
							<Icon 
								name="check"
								size={12}
								color="#FFF"
							/>
						)}
					</View>

					<TextInput
						value={title}
						onChangeText={setTitle}
						editable={editing}
						onSubmitEditing={handleSubmitEditing}
						style={task.done ? styles.taskTextDone : styles.taskText}
						ref={textInputRef}
					/>
				</TouchableOpacity>
			</View>
				
			<View style={styles.buttonsAlign}>
				{editing ? (
					<TouchableOpacity
						onPress={handleCancelEditing}
						style={{ justifyContent: 'center'}}
					>
						<Image source={xIcon} />
					</TouchableOpacity>
				) : (
					<>
						<TouchableOpacity
							onPress={handleStartEditing}
						>
							<Image source={editIcon} />
						</TouchableOpacity>
					</>
				)}
				<Image source={rectangleIcon} style={{ opacity: editing ? 0.6 : 1 }} />

				<TouchableOpacity
					style={{marginRight: 24 }}
					disabled={editing}
					onPress={() => removeTask(task.id)}
				>
					<Image source={trashIcon} style={{ opacity: editing ? 0.3 : 1 }} />
				</TouchableOpacity>
			</View>
		</>
	);
}


const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
	buttonsAlign: {
		width: '25%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	}
})