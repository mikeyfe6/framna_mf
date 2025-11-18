"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import styled from "styled-components";

import { Project } from "@/types/project";
import { projectsUrl } from "@/lib/api";

const Hero = styled.section`
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

const Container = styled.main`
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 2rem;
`;

const SectionTitle = styled.h2`
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: #333;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
`;

const Card = styled.article`
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    background: white;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }

    h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #333;
    }

    p {
        color: #666;
    }
`;

const ProjectImage = styled.img`
    width: 100%;
    border-radius: 6px;
    margin-bottom: 1rem;
`;

export default function Home() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProjects() {
            try {
                const res = await fetch(projectsUrl);
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data);
                }
            } catch (error) {
                console.error("Failed to load projects:", error);
            } finally {
                setLoading(false);
            }
        }
        loadProjects();
    }, []);

    return (
        <>
            <Hero>
                <HeroTitle>Hey there!</HeroTitle>
                <HeroSubtitle>
                    I'm <b>Michael Fransman</b>, a passionate Web Developer.
                    Born, raised and living in Amsterdam, the Netherlands. I
                    have my own web media company, named{" "}
                    <a
                        href="https://menefex.nl"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Menefex
                    </a>
                    . Specialized in building and maintaining modern, responsive
                    and effective websites, webshops and webapps!
                </HeroSubtitle>
                <HeroButton as={Link} href="/about">
                    More about me
                </HeroButton>
            </Hero>

            <Container>
                <SectionTitle>Check out my recent projects:</SectionTitle>
                {loading ? (
                    <p>Loading projects...</p>
                ) : (
                    <Grid>
                        {projects.map((p) =>
                            p.link ? (
                                <a
                                    key={p.id}
                                    href={p.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Card>
                                        {p.image && (
                                            <ProjectImage
                                                src={p.image}
                                                alt={p.title}
                                            />
                                        )}
                                        <h3>{p.title}</h3>
                                        <p>{p.description}</p>
                                    </Card>
                                </a>
                            ) : (
                                <Card key={p.id}>
                                    {p.image && (
                                        <ProjectImage
                                            src={p.image}
                                            alt={p.title}
                                        />
                                    )}
                                    <h3>{p.title}</h3>
                                    <p>{p.description}</p>
                                </Card>
                            )
                        )}
                    </Grid>
                )}
            </Container>
        </>
    );
}
