import "./TodoItem.scss"
type props = {
	text: string,
	isDone: boolean,
	changeItemStatus: () => void,
}
function TodoItem({ text, isDone, changeItemStatus }: props) {
	return (
		<li onClick={changeItemStatus} className={isDone ? "item active" : "item"}>
			<div className="item__checkbox" />
			<div className="item__text">{text}</div>
		</li>
	);
}
export default TodoItem