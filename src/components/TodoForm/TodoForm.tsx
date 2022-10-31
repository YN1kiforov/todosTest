import { KeyboardEvent, useState } from 'react'
import { TodoItemType } from "../../types"
import TodoItem from '../TodoItem/TodoItem';
import "./TodoForm.scss"
function TodoForm() {

	const [todoItems, setTodoItems] = useState<TodoItemType[]>([])
	const [inputValue, setInputValue] = useState<string>("")
	const [sortStatus, setSortStatus] = useState<"All" | "Active" | "Competed">("All")
	function addTodoItem(e: KeyboardEvent<HTMLInputElement>) {
		if (!inputValue || e.key !== "Enter") return
		let itemId = todoItems.length ? todoItems[todoItems.length - 1].id + 1 : 1
		setTodoItems(prev => [...prev, { text: inputValue, isDone: false, id: itemId }])
		setInputValue("")
	}
	function clearCompleted() {
		setTodoItems(prev => prev.filter(item => !item.isDone))
	}
	function changeItemStatus(id: number) {
		setTodoItems(prev => prev.map(i => i.id === id ? { ...i, isDone: !i.isDone } : i)
		)
	}
	function itemsLeftCounter() {
		let counter: number = 0;
		todoItems.forEach(i => {
			!i.isDone && counter++
		})
		return (counter === 1) ? "1 item left" : `${counter} items left`
	}
	return (
		<div className="todo">
			<h2 className='todo__title'>todos</h2>
			<div className='todo__container'>
				<div className='todo__header'>
					<input value={inputValue} onKeyDown={(e) => { addTodoItem(e) }} onChange={e => { setInputValue(e.target.value) }} placeholder="What needs to be done?" className='todo__input'></input>
				</div>
				<ul className='todo__list'>
					{sortStatus === "All" && todoItems.map(i => <TodoItem key={i.id} changeItemStatus={() => { changeItemStatus(i.id) }} text={i.text} isDone={i.isDone} />)}
					{sortStatus === "Active" && todoItems.filter(i => !i.isDone).map(i => <TodoItem key={i.id} changeItemStatus={() => { changeItemStatus(i.id) }} text={i.text} isDone={i.isDone} />)}
					{sortStatus === "Competed" && todoItems.filter(i => i.isDone).map(i => <TodoItem key={i.id} changeItemStatus={() => { changeItemStatus(i.id) }} text={i.text} isDone={i.isDone} />)}
				</ul>
				<div className='todo__bottom'>
					<div className='todo__items-left'>{itemsLeftCounter()}</div>
					<div className='sort-tabs'>
						<button type='button' onClick={() => { setSortStatus("All") }} className={sortStatus === "All" ? "active tab" : "tab"}>All</button>
						<button type='button' onClick={() => { setSortStatus("Active") }} className={sortStatus === "Active" ? "active tab" : "tab"}>Active</button>
						<button type='button' onClick={() => { setSortStatus("Competed") }} className={sortStatus === "Competed" ? "active tab" : "tab"}>Competed</button>
					</div>
					<button onClick={clearCompleted}>Clear completed</button>
				</div>
			</div>
		</div>
	);
}
export default TodoForm;