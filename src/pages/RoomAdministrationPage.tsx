import BasePage from "../components/BasePage/BasePage";
import useAlert from "../hooks/useAlert";

function RoomAdministrationPage() {
    const alert = useAlert();

    return (
        <BasePage alert={alert}>
            <></>
        </BasePage>
    );
}

export default RoomAdministrationPage;