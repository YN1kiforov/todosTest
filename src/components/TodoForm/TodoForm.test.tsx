import { render, fireEvent } from '@testing-library/react';
import TodoForm from './TodoForm';
describe('<TodoForm />', () => {
	test('adding items', async () => {
		const wrapper = render(<TodoForm />)
		let items = await wrapper.container.getElementsByClassName("item")
		const input = await wrapper.findByPlaceholderText("What needs to be done?")

		fireEvent.change(input, { target: { value: 'New value' } })
		fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

		let itemValue1 = await wrapper.findByText("New value")

		expect(items.length).toBe(1);
		expect(itemValue1).toBeInTheDocument();

		fireEvent.change(input, { target: { value: 'Newest value' } })
		fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

		let itemValue2 = await wrapper.findByText("Newest value")

		expect(items.length).toBe(2);
		expect(itemValue2).toBeInTheDocument();

	});
	test('Tabs work correctly', async () => {
		const wrapper = render(<TodoForm />)
		let items = await wrapper.container.getElementsByClassName("item")
		const input = await wrapper.findByPlaceholderText("What needs to be done?")

		fireEvent.change(input, { target: { value: 'New value' } })
		fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

		expect(items.length).toBe(1);

		const tabs = await wrapper.container.getElementsByClassName("tab")
		fireEvent.click(tabs[2])
		expect(items.length).toBe(0);
	});
})