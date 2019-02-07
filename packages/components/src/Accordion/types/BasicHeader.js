import React from 'react';
import PropTypes from 'prop-types';
import { StyleProvider, createComponent } from '../../StyleProvider';
import SpacedGroup from '../../SpacedGroup';

const Container = createComponent(
	() => ({
		padding: '4px 8px',
		display: 'flex',
		'flex-direction': 'row',
		flexWrap: 'nowrap',
		'justify-content': 'space-between',
		'align-items': 'center',
	}),
	'div',
);

const Text = createComponent(
	() => ({
		display: 'flex',
		textAlign: 'left',
		flexDirection: 'column',
		cursor: 'pointer',
	}),
	'div',
);

const BasicHeader = ({ title, secondaryText, supportingVisual, arrow }) => {
	return (
		<StyleProvider>
			<Container>
				<SpacedGroup xs={2} center>
					{supportingVisual}
					<Text>
						<span>{title}</span>
						<span>{secondaryText}</span>
					</Text>
				</SpacedGroup>
				<div>{arrow}</div>
			</Container>
		</StyleProvider>
	);
};

BasicHeader.propTypes = {
	/**
	 * Title of the Accordion Header
	 */
	title: PropTypes.string,
	/**
	 * Additional information about the Accordion Header
	 */
	secondaryText: PropTypes.string,
	/**
	 * Supporting visual
	 */
	supportingVisual: PropTypes.node,
	/**
	 * Arrow instance used to help visually indicate open or closed
	 */
	arrow: PropTypes.node,
};

export default BasicHeader;
