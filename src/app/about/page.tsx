"use client";

import styled from "styled-components";

const Container = styled.main`
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 2rem;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #333;
`;

const Text = styled.p`
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 1.5rem;
`;

const SkillsList = styled.ul`
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    li {
        background: white;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        font-weight: 500;
        color: #333;
    }
`;

export default function About() {
    return (
        <Container>
            <Title>About Me</Title>
            <Text>
                I'm <b>Michael Fransman</b>, a passionate Web Developer. Born,
                raised and living in Amsterdam, the Netherlands. I was a
                busdriver for 10 years in my younger years and turned in to a
                devoted Web Developer. I have my own web media company, named{" "}
                <a
                    href="https://menefex.nl"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Menefex
                </a>
                . Specialized in building and maintaining modern, responsive and
                effective websites, webshops and webapps!
            </Text>
            <Text>
                I love to build personalized websites that my clients/customers
                can relate to. I strongly believe that a website is an important
                extension to your career, business or whatever dreamable
                ambitions you have in the digital space.
            </Text>
            <Text>
                <b>An overview of my main skillset:</b>
            </Text>
            <SkillsList>
                <li>HTML(5)</li>
                <li>CSS(3)</li>
                <li>Javascript</li>
                <li>TypeScript</li>
                <li>React / Next.js / Vue.js</li>
                <li>NodeJS</li>
                <li>GraphQl</li>
                <li>Wordpress</li>
                <li>Contentful</li>
                <li>Strapi</li>
            </SkillsList>
        </Container>
    );
}
