import { Container } from "@mui/material";
import BasePage from "../components/BasePage/BasePage";
import useAlert from "../hooks/useAlert";
import NavButtons from "../components/HomePage/NavButtons";



function HomePage() {
    const alert = useAlert();

    return (
        <BasePage alert={alert}>
            <Container>
                <NavButtons />
            </Container>
        </BasePage>
    );
}

export default HomePage;