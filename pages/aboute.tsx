import Container from '../components/container'
import Layout from '../components/layout'
import Head from 'next/head'
import Banner from '../components/Banner/Banner'
import TimeLine from '../components/TimeLine'
import Event from '../components/TimeLine/Event'
import { MdSchool, MdWork } from 'react-icons/md'
import menu from '../constants/menu'
import Menu from '../components/Menu'
import Car from '../components/Car/car'
import Car2 from '../components/Car2/Car2'
import PostTitle from '../components/post-title'
import ProfileCard from '../components/ProfileCard/ProfileCard'
import 'react-circular-progressbar/dist/styles.css';
import { CircleProgress } from 'react-gradient-progress'

export default function Aboute() {

    const percentage = 66;

    const colors = ["#5265e9", "#c936ef"];
    const size = 6;

    return (
        <>
            <Menu items={menu} disableScroll spacing />
            <Layout>
                <Head>
                    <title>Aboute</title>
                </Head>
                <Container>
                    <PostTitle>Aboute me</PostTitle>
                    <ProfileCard />
                    {/* <Car2 style={{ width: "600px" }} moveBody moveWheels clouds /> */}
                    Mit Navn er Troels Lund, jeg er 26 år og bor på Frederiksberg med min kæreste. Jeg har lige siden jeg var lille været interesseret i elektronik og It, gennem årene udviklet det sig i retning af software udvikling.
                    I 2012 startet jeg på en HF ved Falkonergården Gymnasium på Frederiksberg. Da det her var muligt at tage en HF som Team Danmark støttet atlet. Dette skyldes at jeg har dyrket elite kajak de sidste 10år en del af disse år på diverse ungdomslandshold og senere senior landshold. Jeg har Blandt andet få Bronze til U23 EM, for mere information omkring min sport besøg Troelslund.dk. På Falkonergården Gymnasium havde jeg valgfaget informationsteknologi som endnu engang overbeviste mig om at IT var den helt rette vej for mig at gå.
                    Jeg har altid været glad for at opfinde og konturere ting, og kunne lide at være hands-on med tingene Denne kombination af at opfinde ting og IT ledte mig til at starte på en diplomingeniøruddannelse i softwareteknologi ved DTU i september 2016. Du kan under Udannelse se hvilke fag jeg har haft på de forskelige semestre samt for langt jeg er. Under projekter kan du i øvrigt se korte beskrivelser af nogle af de projekter som jeg har lavet min fritid samt på studiet, flere projekter samt kode kan findes på min Github https://github.com/trolund.
                    Du kan se et overblik over mine mest veludviklet kompetencer lige her nede under. De er angivet som en procent skala hvor af 100% er en maget veludviklet kompetence og 0% er total begynder.
                    Du kan finde min kontakt oplysninger under kontakt
                </Container>
                <TimeLine title="Forløb" paragraph="hej">
                    <Event title="HF - 2016" paragraph="Falkonergårdens Gymnasium" placement={0} year={2012} icon={<MdSchool size={32} />} />
                    <Event title="Diplomingenør" paragraph="Danmarks Tekniske Universitet, Softwareteknologi" placement={0.1} year={2016} icon={<MdSchool size={32} />} />
                    <Event title="Fuldtid hos IT Minds" paragraph="Praktik som en del af Diplomingenøruddanelsen" year={2019} placement={0.12} icon={<MdWork size={32} />} />
                    <Event title="Erhverskandidat" paragraph="Danmarks Tekniske Universitet, Computer science" year={2020} placement={0.22} icon={<MdSchool size={32} />} />
                    <Event title="Deltids job hos IT Minds" paragraph="Udvikler, 25 timer/uge sideløbende med Erhverskandidat" year={2020} placement={0.22} icon={<MdWork size={32} />} />
                    <Event title="Deltids job hos Logos Design" paragraph="Udviklingsingiør, 25 timer/uge sideløbende med Erhverskandidat" year={2020} placement={0.33} icon={<MdWork size={32} />} />
                </TimeLine>
                <Container>
                    <div className={"grid lg:grid-cols-4 lg:gap-4 sm:justify-center md:grid-cols-2 md:gap-2 md:justify-center"}>
                        <div>
                            <CircleProgress percentage={100} strokeWidth={size} primaryColor={colors} />
                        </div>
                        <div>
                            <CircleProgress percentage={70} strokeWidth={size} primaryColor={colors} />
                        </div>
                        <div>
                            <CircleProgress percentage={10} strokeWidth={size} primaryColor={colors} />
                        </div>
                        <div>
                            <CircleProgress percentage={20} strokeWidth={size} primaryColor={colors} />
                        </div>
                        <div>
                            <CircleProgress percentage={60} strokeWidth={size} primaryColor={colors} />
                        </div>
                        <div>
                            <CircleProgress percentage={80} strokeWidth={size} primaryColor={colors} />
                        </div>
                        <div>
                            <CircleProgress percentage={90} strokeWidth={size} primaryColor={colors} />
                        </div>
                    </div>
                </Container>
            </Layout>
        </>
    )
}