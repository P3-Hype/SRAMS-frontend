import BasePage from "../components/BasePage/BasePage";
import useAlert from "../hooks/useAlert";

function RoomOverviewPage() {
    const alert = useAlert();
    
    return (
        <BasePage alert={alert}>
            <></>
        </BasePage>
    );
}

export default RoomOverviewPage;