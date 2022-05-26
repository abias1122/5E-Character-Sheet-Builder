import {
	ChevronDownIcon,
	ChevronRightIcon,
	ChevronUpIcon
} from '@heroicons/react/solid';
import {
	KeyboardEvent,
	KeyboardEventHandler,
	useCallback,
	useState
} from 'react';
import { SrdItem, SubraceItem } from '../../../types/srd';

import classes from './RaceOption.module.css';

export type RaceOptionProps = {
	race: SrdItem;
	subraces?: SubraceItem[];
	onChoose: (subraceIndex?: string) => void;
	iconId: string;
};

const RaceOption = ({
	race,
	subraces,
	onChoose,
	iconId
}: RaceOptionProps): JSX.Element => {
	const [showSubraces, setShowSubraces] = useState(false);
	const hasMultipleSubraces = subraces && subraces.length > 1;
	const hasOneSubrace = subraces && subraces.length === 1;
	const raceTitle = hasOneSubrace ? subraces[0].name : race.name;

	const handleRaceClick = useCallback(() => {
		if (hasMultipleSubraces) {
			setShowSubraces(prevState => !prevState);
		} else if (hasOneSubrace) {
			onChoose(subraces[0].index);
		} else {
			onChoose();
		}
	}, [setShowSubraces, hasMultipleSubraces, onChoose, hasOneSubrace, subraces]);

	const handleRaceKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
		event => {
			if (event.code === 'Enter' || event.code === 'Space') {
				event.preventDefault();
				event.stopPropagation();
				handleRaceClick();
			}
		},
		[handleRaceClick]
	);

	const handleSubraceClick = useCallback(
		(subraceIndex: string) => {
			onChoose(subraceIndex);
		},
		[onChoose]
	);

	const handleSubraceKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>, subraceIndex: string) => {
			if (event.code === 'Enter' || event.code === 'Space') {
				event.preventDefault();
				event.stopPropagation();
				onChoose(subraceIndex);
			}
		},
		[onChoose]
	);

	return (
		<li className={classes['race-li']} data-testid="race-option">
			<div>
				<div
					className={classes['race-container']}
					tabIndex={0}
					onClick={handleRaceClick}
					onKeyDown={handleRaceKeyDown}
					aria-label={raceTitle}
					role="button"
				>
					<div className={classes['race-title']}>
						<div className={classes['icon-container']}>
							<svg className={classes.icon}>
								<use xlinkHref={`/Icons.svg#${iconId}`} />
							</svg>
						</div>{' '}
						{raceTitle}
					</div>
					{hasMultipleSubraces ? (
						showSubraces ? (
							<ChevronUpIcon
								className={classes.chevron}
								data-testid="chevron-up"
							/>
						) : (
							<ChevronDownIcon
								className={classes.chevron}
								data-testid="chevron-down"
							/>
						)
					) : (
						<ChevronRightIcon
							className={classes.chevron}
							data-testid="chevron-right"
						/>
					)}
				</div>
				{showSubraces && (
					<ul className={classes['subrace-list']}>
						{subraces?.map(subrace => (
							<li key={subrace.index}>
								<div
									className={classes['race-container']}
									tabIndex={0}
									aria-label={subrace.name}
									onClick={() => handleSubraceClick(subrace.index)}
									onKeyDown={event =>
										handleSubraceKeyDown(event, subrace.index)
									}
								>
									<div className={classes['race-title']}>{subrace.name}</div>
									<ChevronRightIcon className={classes.chevron} />
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</li>
	);
};

export default RaceOption;
