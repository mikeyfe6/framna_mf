"use client";

import Link from "next/link";
import styled from "styled-components";

const HeroSection = styled.section`
    background: linear-gradient(135deg, #fc0 0%, #f8e491 100%);
    color: #333;
    padding: 4rem 2rem;
    text-align: center;
`;

const HeroTitle = styled.h1`
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 800;
    margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
    font-size: clamp(1.1rem, 2.5vw, 1.3rem);
    opacity: 0.95;
    max-width: 700px;
    margin: 0 auto;
`;

const HeroButton = styled.a`
    display: inline-block;
    margin-top: 2rem;
    padding: 0.875rem 2rem;
    background: #333;
    color: #fff;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    transition: background 0.2s, transform 0.2s;

    &:hover {
        background: #555;
        transform: translateY(-2px);
    }
`;

export default function Hero() {
    return (
        <HeroSection>
            <HeroTitle>Hey there!</HeroTitle>
            <HeroSubtitle>
                I'm <b>Michael Fransman</b>, a passionate Web Developer. Born,
                raised and living in Amsterdam, the Netherlands. I have my own
                web media company, named{" "}
                <a
                    href="https://menefex.nl"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Menefex
                </a>
                . Specialized in building and maintaining modern, responsive and
                effective websites, webshops and webapps!
            </HeroSubtitle>
            <HeroButton as={Link} href="/about">
                More about me
            </HeroButton>
        </HeroSection>
    );
}
