import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
        --background: #f5f5f5;
        --foreground: #171717;
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --background: #f5f5f5;
            --foreground: #171717;
        }
    }

    html {
        scroll-behavior: smooth;
    }

    html,
    body {
        max-width: 100vw;
        overflow-x: hidden;
    }

    body {
        color: var(--foreground);
        background: var(--background);
        font-family: Arial, Helvetica, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    a {
        color: inherit;
        text-decoration: none;

        p & {
            color: #0070f3;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    p {
        line-height: 1.6;
    }

    code {
        font-family: Menlo, Monaco, "Courier New", monospace;
    }
`;
