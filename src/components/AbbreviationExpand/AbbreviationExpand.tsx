import './AbbreviationExpand.css';
import { Box, Grow } from '@mui/material';

interface AbbreviationExpandProps {
	readonly phrase: string;
	readonly expanded: boolean;
}

/**
 * Create abbriviation of **phrase** prop.
 *
 * Words in *uppercase* are used in the abbreviation.
 */
export function AbbreviationExpand(props: AbbreviationExpandProps) {
	const words = props.phrase.split(' ');

	return (
		<div style={{ cursor: 'pointer' }}>
			<Box display={'flex'} flexDirection={'row'}>
				{words.map((word) => {
					return <Word key={word} word={word} expanded={props.expanded}></Word>;
				})}
			</Box>
		</div>
	);
}

interface WordProps {
	readonly word: string;
	readonly expanded: boolean;
}

function Word(props: WordProps) {
	const firstLetter = props.word[0];
	const collapses = firstLetter != firstLetter.toLocaleUpperCase();
	const hiddenPart = collapses ? props.word : props.word.substring(1, props.word.length);
	return (
		<Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
			{!collapses && <span className='first-letter'>{firstLetter}</span>}
			{!collapses && (
				<span
					style={{
						transition: '.5s',
						opacity: props.expanded ? '0%' : '100%',
					}}
				>
					.
				</span>
			)}
			<div
				style={{
					maxWidth: props.expanded ? '100px' : '0px',
					transition: '.5s ease',
					marginRight: collapses && !props.expanded ? '0px' : '1rem',
				}}
			>
				<Grow in={props.expanded} timeout={500}>
					<span>{hiddenPart}</span>
				</Grow>
			</div>
		</Box>
	);
}

export default AbbreviationExpand;
