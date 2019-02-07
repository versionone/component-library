import PropTypes from 'prop-types';
import React from 'react';
import {
	createComponent,
	StyleProvider,
	styleUtils,
} from '../../StyleProvider';
import SpacedGroup from './../../SpacedGroup';
import { palette } from '../../palette';

const UnderlineTabImpl = createComponent(
	({ placement, selected, disabled, focused, theme }) => {
		return {
			...styleUtils.conditionalStyle(disabled, 'opacity', '0.5'),
			...styleUtils.conditionalStyle(
				disabled,
				'cursor',
				'not-allowed',
				'pointer',
			),
			[`border-${placement}-style`]: 'solid',
			[`border-${placement}-width`]: 3,
			...styleUtils.conditionalStyle(
				selected,
				`border-${placement}-color`,
				palette.obsidian,
				palette.transparent,
			),
			...styleUtils.conditionalStyle(
				selected,
				'color',
				palette.obsidian,
				palette.dove,
			),
			...(focused ? theme.focused : {}),
		};
	},
	'div',
	['data-component', 'data-test'],
);

const Title = createComponent(
	() => ({
		padding: '0 4px',
	}),
	'span',
);

const UnderlineTab = props => {
	const spacing = props.icon ? 4 : 0;
	return (
		<StyleProvider>
			<UnderlineTabImpl
				data-component="Tabs.UnderlineTab"
				data-test={props['data-test']}
				selected={props.selected}
				disabled={props.disabled}
				focused={props.focused}
				placement={props.placement}
			>
				<SpacedGroup xs={spacing} center>
					{props.icon}
					<Title>{props.title}</Title>
				</SpacedGroup>
			</UnderlineTabImpl>
		</StyleProvider>
	);
};

UnderlineTab.propTypes = {
	/**
	 * data-test attribute
	 */
	'data-test': PropTypes.string,
	/**
	 * If true the tab is selected
	 */
	selected: PropTypes.bool,
	/**
	 * If true the tab is disabled
	 */
	disabled: PropTypes.bool,
	/**
	 * If true the tab is focused
	 */
	focused: PropTypes.bool,
	/**
	 * Title of the tab
	 */
	title: PropTypes.string,
	/**
	 * Icon of the tab
	 */
	icon: PropTypes.node,
	/**
	 * Placement of the underline relative to the title
	 */
	placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
};

UnderlineTab.defaultProps = {
	selected: false,
	disabled: false,
	focused: false,
	title: '',
	icon: null,
	placement: 'bottom',
};

export default UnderlineTab;
