import "./AbbreviationExpand.css"
import { Box, Grow } from "@mui/material";
import { useState } from "react";

interface AbbreviationExpandProps {
    phrase: string
}

/**
 * Set **phrase** prop to the whole sentence.
 * 
 * Words in *uppercase* are used in the abbreviation.
 */
export function AbbreviationExpand(props: AbbreviationExpandProps) {
    const words = props.phrase.split(' ');
    const [expand, setExpand] = useState(false);
    const handleMouserEnter = () => setExpand(true)
    const handleMouserLeave = () => setExpand(false)

    return (
    <div onMouseEnter={handleMouserEnter} onMouseLeave={handleMouserLeave} style={{cursor: "pointer"}}>
        <Box display={"flex"} flexDirection={"row"}>
            { words.map(word => {return <Word word={word} expand={expand}></Word>})}
        </Box>
    </div>
    )
}

interface WordProps {
    word:string,
    expand:boolean
}

function Word(props: WordProps ) {
    const firstLetter = props.word[0];
    const isConjunction = !(firstLetter == firstLetter.toLocaleUpperCase())
    const hiddenPart = isConjunction ? props.word : props.word.substring(1, props.word.length);
    return (
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            {!isConjunction && <span className="first-letter">{firstLetter}</span>}
            {!isConjunction && <span style={{transition: ".5s", opacity: props.expand ? "0%" : "100%"}}>.</span>}
            <div style={{maxWidth: props.expand ? "100px" : "0px", transition: ".5s ease", marginRight: (isConjunction && !props.expand) ? "0px" : "1rem"}}>
                <Grow in={props.expand} timeout={500}>
                    <span>{hiddenPart}</span>
                </Grow>
            </div>
        </Box>
    )
}