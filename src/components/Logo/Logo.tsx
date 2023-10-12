import AbbreviationExpand from "../AbbreviationExpand/AbbreviationExpand"
import { useState } from "react"
import { Link } from 'react-router-dom';

interface LogoProps {
    readonly expandOnHover?: boolean,
}

export function Logo(props: LogoProps) {
    const [expanded, setExpanded] = useState(false);
    const srams = "Smart Room Allocation and Monitoring System"

    const expandOnHover = props.expandOnHover ?? false;
    if (expandOnHover) {
        const handleMouseEnter = () => setExpanded(true);
        const handleMouseLeave = () => setExpanded(false);
    
        return (
            <Link to = "/">
            <div className="logo" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{width: "fit-content"}}>
                <AbbreviationExpand phrase={srams} expanded={expanded}/>
            </div>
            </Link>
        );
    } else {
        return (
            <Link to = "/">
            <span>srams</span>
            </Link>
        );
    }
    
}

export default Logo