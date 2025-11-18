"use client";

import Link from "next/link";
import styled from "styled-components";

const HeaderWrapper = styled.header`
    background: #dadada;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
`;

const Nav = styled.nav`
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Logo = styled(Link)`
    font-size: 1.1rem;
    font-weight: 700;
    color: #333;
    text-decoration: none;

    &:hover {
        color: #5b5a5a;
    }

    @media (min-width: 600px) {
        font-size: 1.5rem;
    }
`;
const NavLinks = styled.div`
    display: flex;
    gap: 1rem;

    @media (min-width: 600px) {
        gap: 2rem;
    }
`;

const NavLink = styled(Link)`
    color: #333;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;

    &:hover {
        color: #5b5a5a;
    }
`;
export default function Header() {
    return (
        <HeaderWrapper>
            <Nav>
                <Logo href="/">Michael Fransman</Logo>
                <NavLinks>
                    <NavLink href="/">Portfolio</NavLink>
                    <NavLink href="/about">About</NavLink>
                    <NavLink href="/admin">Admin</NavLink>
                </NavLinks>
            </Nav>
        </HeaderWrapper>
    );
}
