import { ChangeEventHandler, MouseEventHandler, memo } from 'react';

import { AbilityItem } from '../../../../../types/srd';
import Button from '../../../../Button/Button';
import classes from './RollDisplay.module.css';

export type RollDisplayProps = {
	rolls?: number[] | null;
	abilities: AbilityItem[];
	roll: MouseEventHandler<HTMLButtonElement>;
	ability?: string | null;
	total?: number;
	onSelectAbility: ChangeEventHandler<HTMLSelectElement>;
};

const RollDisplay = ({
	rolls,
	abilities,
	roll,
	onSelectAbility,
	ability,
	total
}: RollDisplayProps): JSX.Element => {
	if (rolls) {
		return (
			<div className={classes['display-container']} data-testid="roll-display">
				<div className={classes.total} data-testid="roll-total">
					{total}
				</div>
				<div className={classes.rolls}>
					{rolls.map((roll, index) => (
						<div key={index} className={classes.roll} data-testid="roll-die">
							{roll}
						</div>
					))}
				</div>
				<select
					onChange={onSelectAbility}
					value={ability ? ability : 'blank'}
					aria-label="Select ability for score"
				>
					<option value="blank">&mdash;</option>
					{abilities.map(a => (
						<option value={a.index} key={a.index}>
							{a.index.toUpperCase()}
						</option>
					))}
				</select>
			</div>
		);
	} else {
		return (
			<div className={classes['display-container']} data-testid="roll-display">
				<div className={classes.total}>&mdash;</div>
				<Button positive onClick={roll} size="medium">
					Roll
				</Button>
			</div>
		);
	}
};

export default memo(RollDisplay);
