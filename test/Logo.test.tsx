import Logo from '../src/components/Logo/Logo';
import { expect, it, describe, beforeEach } from 'vitest';
import { Simulate, act, isCompositeComponent } from 'react-dom/test-utils';
import ReactDOM from 'react-dom/client';
import React from 'react';

let container: HTMLDivElement;
beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container);
});

describe('Logo tests', () => {
	it('renders', () => {
		act(() => {
			ReactDOM.createRoot(container).render(
				<>
					<Logo expandOnHover={true} />
				</>
			);
		});
		const logo = container.children[0];
		Simulate.mouseEnter(logo);
		isCompositeComponent(logo);
		expect(logo).toHaveClass('logo');
	});
});
