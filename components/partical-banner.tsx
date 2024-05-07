import { useCallback, useState, useEffect } from "react";
import type { Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

const ParticalBanner = () => {
    const [isDark, setIsDark] = useState(false)

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine)
    }, [])

    useEffect(() => {
        window.addEventListener('isDarkStorage', (e) => {
            let isDark = (e as any).detail as boolean;
            setIsDark(isDark)
        })
        window.addEventListener('setIsDarkStorage', (e) => {
            let isDark = (e as any).detail as boolean;
            setIsDark(isDark)
        })
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            // loaded={particlesLoaded}
            options={{
                // background: {
                //     color: {
                //         value: "#0d47a1",
                //     },
                // },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: false,
                            mode: "push",
                        },
                        onHover: {
                            enable: false,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: !isDark ? "#000" : "#FFF",
                    },
                    links: {
                        color: !isDark ? "#000" : "#FFF",
                        distance: 150,
                        enable: true,
                        opacity: 0.2,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 0.5,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 50,
                    },
                    opacity: {
                        value: 0.3,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }}
        />
    );
};

export default ParticalBanner;

