import {
  Box,
  Container,
  Divider,
  Grid,
  Modal,
  Paper,
  Typography
} from "@mui/material";
import { useState } from "react";
import AppDrawer from "../../components/AppDrawer";
import welcomeBackground from "../../images/welcome_background.jpg";
import { dialogStyle } from "../../theme/theme";
import "./home.css";
import home1 from "./home1.jpg";
import home2 from "./home2.jpg";
import home3 from "./home3.png";
import home4 from "./home4.jpg";
import home5 from "./home5.jpg";
import home6 from "./home6.jpg";
import el1 from "./images/el1.png";
import el2 from "./images/el2.png";
import el3 from "./images/el3.png";
import esc1 from "./images/escova1.png";
import esc2 from "./images/escova2.png";
import esc3 from "./images/escova3.png";
import esc4 from "./images/escova4.png";
import fio1 from "./images/fio1.png";
import fio2 from "./images/fio2.png";
import fio3 from "./images/fio3.png";
import inter1 from "./images/inter1.png";
import inter2 from "./images/inter2.png";
import inter3 from "./images/inter3.png";
import t1 from "./images/t1.png";
import t2 from "./images/t2.png";
import t3 from "./images/t3.png";
import t4 from "./images/t4.png";
import t5 from "./images/t5.png";
import tec1 from "./images/tec1.png";
import tec2 from "./images/tec2.png";
import tec3 from "./images/tec3.png";

export default function Home(): JSX.Element {
  const [openTreatmentsModal, setTreatmentsModalOpen] = useState(false);
  const [openToothBrushModal, setToothBrushModalOpen] = useState(false);
  const [openTechniqueModal, setTechniqueModalOpen] = useState(false);
  const [openDentalFlossModal, setDentalFlossModalOpen] = useState(false);
  const [openEletricModal, setEletricModalOpen] = useState(false);
  const [openInterModal, setInterModalOpen] = useState(false);

  return (
    <AppDrawer title="Dentistas Integrados" selectedIndex={0}>
      <Container>
        <Grid container spacing={6} rowSpacing={8}>
          <Grid item xs={12}>
            <Paper sx={{ position: "relative" }} elevation={0}>
              <img
                width="100%"
                height="140px"
                style={{ objectFit: "cover", opacity: 0.32 }}
                src={welcomeBackground}
                alt="Bem-vindo"
              />
              <Typography
                color="#23255D"
                width="100%"
                textAlign="center"
                variant="h2"
                sx={{ position: "absolute", top: "30%", bottom: "50%" }}
              >
                Bem-vindo!
              </Typography>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            display="flex"
            justifyContent="center"
          >
            <Paper
              className="tip-container"
              elevation={3}
              onClick={() => setTreatmentsModalOpen(true)}
            >
              <Typography className="tip-text" variant="h6">
                Tratamentos que oferecemos
              </Typography>
              <img
                className="tip-image"
                src={home6}
                alt="Imagem: Tratamentos que oferecemos"
              />
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            display="flex"
            justifyContent="center"
          >
            <Paper
              className="tip-container"
              elevation={3}
              onClick={() => setToothBrushModalOpen(true)}
            >
              <Typography className="tip-text" variant="h6">
                Tipos de escovas de dente
              </Typography>
              <img
                className="tip-image"
                src={home1}
                alt="Imagem: Tipos de escovas de dente"
              />
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            display="flex"
            justifyContent="center"
          >
            <Paper
              className="tip-container"
              elevation={3}
              onClick={() => setTechniqueModalOpen(true)}
            >
              <Typography className="tip-text" variant="h6">
                Técnica de <br />
                escovação
              </Typography>
              <img
                className="tip-image"
                src={home2}
                alt="Imagem: Técnica de escovação"
              />
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            display="flex"
            justifyContent="center"
          >
            <Paper
              className="tip-container"
              elevation={3}
              onClick={() => setDentalFlossModalOpen(true)}
            >
              <Typography className="tip-text" variant="h6">
                Uso do fio <br />
                dental
              </Typography>
              <img
                className="tip-image"
                src={home3}
                alt="Imagem: Uso do fio dental"
              />
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            display="flex"
            justifyContent="center"
          >
            <Paper
              className="tip-container"
              elevation={3}
              onClick={() => setEletricModalOpen(true)}
            >
              <Typography className="tip-text" variant="h6">
                Uso da escova <br /> elétrica
              </Typography>
              <img
                className="tip-image"
                src={home4}
                alt="Imagem: Uso da escova elétrica"
              />
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            display="flex"
            justifyContent="center"
          >
            <Paper
              className="tip-container"
              elevation={3}
              onClick={() => setInterModalOpen(true)}
            >
              <Typography className="tip-text" variant="h6">
                Uso da escova interdental
              </Typography>
              <img
                className="tip-image"
                src={home5}
                alt="Imagem: Uso da escova interdental"
              />
            </Paper>
          </Grid>
        </Grid>
        <Modal
          open={openTreatmentsModal}
          onClose={() => setTreatmentsModalOpen(false)}
        >
          <Box
            sx={{
              ...dialogStyle,
              width: "50%",
              overflow: "auto",
              maxHeight: "calc(100vh - 15%)",
            }}
          >
            <Typography variant="h5" textAlign="center" sx={{ width: "100%" }}>
              Tratamentos que oferecemos
            </Typography>
            <Grid container mt={1} spacing={4} rowSpacing={2}>
              <Grid item xs={3}>
                <img src={t1} alt="" width="100%" />
              </Grid>
              <Grid item xs={9}>
                <Typography fontWeight="bold" variant="body1">
                  Clareamento dental
                </Typography>
                <ul style={{ listStyleType: "disc", marginLeft: "24px" }}>
                  <li><Typography>Dentes mais brancos</Typography></li>
                  <li><Typography>Pode ser feito em casa</Typography></li>
                  <li><Typography>Com LEDS e laser, o resultado é mais rápido</Typography></li>
                </ul>
              </Grid>
              <Grid item xs={12}>
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={3}>
                <img src={t2} alt="" width="100%" />
              </Grid>
              <Grid item xs={9}>
              <Typography fontWeight="bold" variant="body1">
                  Tratamento Ortodôntico
                </Typography>
                <ul style={{ listStyleType: "disc", marginLeft: "24px" }}>
                  <li><Typography>Alinhamento e harmonia dos dentes</Typography></li>
                  <li><Typography>Correção de má oclusão dentária</Typography></li>
                  <li><Typography>Melhorias estéticas e funcionais</Typography></li>
                </ul>
              </Grid>
              <Grid item xs={12}>
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={3}>
                <img src={t3} alt="" width="100%" />
              </Grid>
              <Grid item xs={9}>
              <Typography fontWeight="bold" variant="body1">
              Coroa de porcelana
                </Typography>
                <ul style={{ listStyleType: "disc", marginLeft: "24px" }}>
                  <li><Typography>Corrige a cor indesejada</Typography></li>
                  <li><Typography>Melhora o formato</Typography></li>
                  <li><Typography>Corrige tamanho e posição</Typography></li>
                </ul>
              </Grid>
              <Grid item xs={12}>
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={3}>
                <img src={t4} alt="" width="100%" />
              </Grid>
              <Grid item xs={9}>
              <Typography fontWeight="bold" variant="body1">
              Implente dentário
                </Typography>
                <ul style={{ listStyleType: "disc", marginLeft: "24px" }}>
                  <li><Typography>Reposição de um ou mais dentes perdidos</Typography></li>
                  <li><Typography>Modelo fixo e móvel</Typography></li>
                  <li><Typography>Melhorias estéticas e funcionais</Typography></li>
                </ul>
              </Grid>
              <Grid item xs={12}>
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={3}>
                <img src={t5} alt="" width="100%" />
              </Grid>
              <Grid item xs={9}>
              <Typography fontWeight="bold" variant="body1">
              Gengivoplastia
                </Typography>
                <ul style={{ listStyleType: "disc", marginLeft: "24px" }}>
                  <li><Typography>Remodela o tamanho da gengiva</Typography></li>
                  <li><Typography>Corrige possíveis deformidades</Typography></li>
                  <li><Typography>Dá mais destaque ao seu sorriso</Typography></li>
                </ul>
              </Grid>
            </Grid>
          </Box>
        </Modal>
        <Modal
          open={openToothBrushModal}
          onClose={() => setToothBrushModalOpen(false)}
        >
          <Box
            sx={{
              ...dialogStyle,
              width: "50%",
              overflow: "auto",
              maxHeight: "calc(100vh - 15%)",
            }}
          >
            <Typography variant="h5" textAlign="center" sx={{ width: "100%" }}>
              Tipos de escova de dente
            </Typography>
            <Grid container mt={1} spacing={4} rowSpacing={2}>
              <Grid item xs={3}>
                <img src={esc1} alt="" width="100%" />
              </Grid>
              <Grid item xs={9}>
                <Typography fontWeight="bold" variant="body1">
                  Escova de dente tradicional
                </Typography>
                <Typography variant="body2">
                  É a escova de dente comum que facilmente encontramos em todos
                  os mercados. Existem inúmeras opções, formatos e tamanhos, e a
                  dica principal para uma melhor limpeza dos dentes, é escolher
                  as de cerdas macias, de cabeça pequena e cabo confortável.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={3}>
                <img src={esc2} alt="" width="100%" />
              </Grid>
              <Grid item xs={9}>
                <Typography fontWeight="bold" variant="body1">
                  Escova de dente elétrica
                </Typography>
                <Typography variant="body2">
                  Este modelo funciona com pilhas ou baterias. Elas geralmente
                  possuem cabeças arredondadas que executam automaticamente
                  movimentos de oscilação e rotação. Possuem a mesma função que
                  os modelos tradicionais.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={3}>
                <img src={esc3} alt="" width="100%" />
              </Grid>
              <Grid item xs={9}>
                <Typography fontWeight="bold" variant="body1">
                  Escova de dente unitufo
                </Typography>
                <Typography variant="body2">
                  Este modelo possui apenas um tufo de cerdas em sua cabeça e é
                  indicada para quem faz o uso do Aparelho Ortodôntico, pois
                  facilita o acesso às regiões atrás do fio ortodôntico.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={3}>
                <img src={esc4} alt="" width="100%" />
              </Grid>
              <Grid item xs={9}>
                <Typography fontWeight="bold" variant="body1">
                  Escova de dente interdental
                </Typography>
                <Typography variant="body2">
                  Este modelo é formado por um tufo de cerdas finas e macias
                  presa a um cabo anatômico. Também são indicadas para pacientes
                  que usam Aparelho Ortodôntico por facilitar a remoção de
                  resíduos que ficam alojados nas peças.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Modal>
        <Modal
          open={openTechniqueModal}
          onClose={() => setTechniqueModalOpen(false)}
        >
          <Box
            sx={{
              ...dialogStyle,
              width: "50%",
              overflow: "auto",
              maxHeight: "calc(100vh - 15%)",
            }}
          >
            <Typography variant="h5" textAlign="center" sx={{ width: "100%" }}>
              Técnica de escovação
            </Typography>
            <Grid container mt={1} spacing={4} rowSpacing={2}>
              <Grid item xs={3}>
                <img src={tec1} alt="" width="100%" />
              </Grid>
              <Grid item xs={9} display="flex" alignItems="center">
                <Typography variant="subtitle1">
                  Coloque a escova ao longo da junção da gengiva com o dente em
                  um ângulo de 45º. Faça movimentos para frente e para trás para
                  remover a placa.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={3}>
                <img src={tec2} alt="" width="100%" />
              </Grid>
              <Grid item xs={9} display="flex" alignItems="center">
                <Typography variant="subtitle1">
                  Coloque a escova verticalmente para escovar a face interna dos
                  dentes superiores e inferiores.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={3}>
                <img src={tec3} alt="" width="100%" />
              </Grid>
              <Grid item xs={9} display="flex" alignItems="center">
                <Typography variant="subtitle1">
                  Escove as superfícies de mastigação com movimentos para frente
                  e para trás. Não se esqueça de escovar a língua para completar
                  a higiene bucal.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Modal>
        <Modal
          open={openDentalFlossModal}
          onClose={() => setDentalFlossModalOpen(false)}
        >
          <Box
            sx={{
              ...dialogStyle,
              width: "50%",
              overflow: "auto",
              maxHeight: "calc(100vh - 15%)",
            }}
          >
            <Typography variant="h5" textAlign="center" sx={{ width: "100%" }}>
              Uso do fio dental
            </Typography>
            <Grid container mt={1} spacing={4} rowSpacing={2}>
              <Grid item xs={3}>
                <img src={fio1} alt="" width="100%" />
              </Grid>
              <Grid item xs={9} display="flex" alignItems="center">
                <Typography variant="subtitle1">
                  Corte aproximadamente 45 cm de fio e enrole-o nos dedos médios
                  de ambas as mãos, deixando aproximadamente 4 cm entre um e o
                  outro.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={3}>
                <img src={fio2} alt="" width="100%" />
              </Grid>
              <Grid item xs={9} display="flex" alignItems="center">
                <Typography variant="subtitle1">
                  Deslize-o suavemente entre os dentes para alcançar abaixo da
                  linha das gengivas.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={3}>
                <img src={fio3} alt="" width="100%" />
              </Grid>
              <Grid item xs={9} display="flex" alignItems="center">
                <Typography variant="subtitle1">
                  Curve o fio em forma de "C" e deslize-o entre os dentes com um
                  movimento de varredura. Repita esta ação entre todos os
                  espaços interdentais.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Modal>
        <Modal
          open={openEletricModal}
          onClose={() => setEletricModalOpen(false)}
        >
          <Box
            sx={{
              ...dialogStyle,
              width: "50%",
              overflow: "auto",
              maxHeight: "calc(100vh - 15%)",
            }}
          >
            <Typography variant="h5" textAlign="center" sx={{ width: "100%" }}>
              Uso da escova elétrica
            </Typography>
            <Grid container mt={1} spacing={4} rowSpacing={2}>
              <Grid item xs={3}>
                <img src={el1} alt="" width="100%" />
              </Grid>
              <Grid item xs={9} display="flex" alignItems="center">
                <Typography variant="subtitle1">
                  Coloque a escova na posição horizontal e faça um movimento
                  suave da frente para trás.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={3}>
                <img src={el2} alt="" width="100%" />
              </Grid>
              <Grid item xs={9} display="flex" alignItems="center">
                <Typography variant="subtitle1">
                  Escove todas as faces do dente (interna, externa e de
                  mastigação), incluindo a junção da gengiva com o dente.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={3}>
                <img src={el3} alt="" width="100%" />
              </Grid>
              <Grid item xs={9} display="flex" alignItems="center">
                <Typography variant="subtitle1">
                  Mantenha-a aproximadamente 6 segundos sobre cada elemento
                  dentário.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Modal>
        <Modal open={openInterModal} onClose={() => setInterModalOpen(false)}>
          <Box
            sx={{
              ...dialogStyle,
              width: "50%",
              overflow: "auto",
              maxHeight: "calc(100vh - 15%)",
            }}
          >
            <Typography variant="h5" textAlign="center" sx={{ width: "100%" }}>
              Uso da escova iterdental
            </Typography>
            <Grid container mt={1} spacing={4} rowSpacing={2}>
              <Grid item xs={3}>
                <img src={inter1} alt="" width="100%" />
              </Grid>
              <Grid item xs={9} display="flex" alignItems="center">
                <Typography variant="subtitle1">
                  Gire lentamente a cabeça da escova em um ângulo em que deslize
                  entre os dentes. Tome cuidado para não aplicar pressão
                  excessiva, nem dobre a escova.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={3}>
                <img src={inter2} alt="" width="100%" />
              </Grid>
              <Grid item xs={9} display="flex" alignItems="center">
                <Typography variant="subtitle1">
                  A cabeça da escova pode ser colocada entre os dentes
                  anteriores (perto dos lábios e bochechas) ou a partir da parte
                  de trás (perto da língua).
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={3}>
                <img src={inter3} alt="" width="100%" />
              </Grid>
              <Grid item xs={9} display="flex" alignItems="center">
                <Typography variant="subtitle1">
                  Os pacientes com aparelho ortodôntico devem considerar o
                  início da escovação pela parte de baixo e ao redor dos
                  braquetes.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Container>
    </AppDrawer>
  );
}
