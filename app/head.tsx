import { TITLE } from "../lib/constants";

export default function Head() {
    return (
        <>
            <meta name="application-name" content={TITLE} />
            <meta name="theme-color" content="#000000" />
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
            />
            <link rel="apple-touch-icon" sizes="180x180" href="icons/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="icons/favicon-16x16.png" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="google-site-verification" content="fK40wZmELLwBjymUVMTij0LHyohVxm-xrNj4T7mPzaU" />
        </>
    );
}
