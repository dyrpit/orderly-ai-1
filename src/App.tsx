import { Grid, GridItem, Show } from "@chakra-ui/react";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "hero" "footer"`,
        lg: `"nav nav" "aside hero" "footer footer"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "300px 1fr",
      }}
      sx={{
        maxWidth: "1170px",
        width: "100%",
        margin: "0 auto",
      }}
    >
      <GridItem area="nav" height="120px" marginLeft="300px">
        <Navbar />
      </GridItem>
      <GridItem area="hero" bg="blue" minHeight="100vw" maxHeight="100%">
        Hero
      </GridItem>
      <Show above="lg">
        <GridItem
          area="aside"
          bg="gold"
          sx={{ display: { base: "none", lg: "block" } }}
        >
          Aside
        </GridItem>
      </Show>
      <GridItem area="footer" bg="red" height="120px">
        Footer
      </GridItem>
    </Grid>
  );
}

export default App;
