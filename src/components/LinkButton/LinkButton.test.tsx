import * as stories from './LinkButton.stories';

import { render, screen } from '@testing-library/react';

import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';

const { Default, Untabbable } = composeStories(stories);

beforeAll(() => {
	const useRouter = jest.spyOn(require('next/router'), 'useRouter');
	const router = {
		push: () => Promise.resolve(),
		prefetch: () => Promise.resolve()
	};
	useRouter.mockReturnValue(router);
});

it('renders correctly', () => {
	render(<Default />);

	expect(screen.getByRole('link')).toMatchSnapshot();
});

it('sets default tab index when not passed in', () => {
	render(<Default />);

	expect(screen.getByRole('link').tabIndex).toBe(0);
});

it('sets passed in properties', () => {
	render(<Untabbable />);

	const { tabIndex, href } = screen.getByRole('link') as HTMLLinkElement;
	expect(tabIndex).toBe(Untabbable.args?.tabIndex);
	expect(href).toContain(Untabbable.args?.href);
});
