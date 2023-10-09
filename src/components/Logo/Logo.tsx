import AbbreviationExpand from "../AbbreviationExpand/AbbreviationExpand"
import { useState } from "react"

interface LogoProps {
    expandOnHover?: boolean,
}

export function Logo(props: LogoProps) {
    const [expanded, setExpanded] = useState(false);
    const srams = "Smart Room Allocation and Monitoring System"

    const expandOnHover = (props.expandOnHover == undefined) ? false : props.expandOnHover;
    if (expandOnHover) {
        const handleMouseEnter = () => setExpanded(true);
        const handleMouseLeave = () => setExpanded(false);
    
        return (
            <div className="logo" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{width: "fit-content"}}>
                <AbbreviationExpand phrase={srams} expanded={expanded}/>
            </div>
        );
    } else {
        return (
            <span>srams</span>
        );
    }
    
}

export default Logo