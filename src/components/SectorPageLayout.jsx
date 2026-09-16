import React from 'react';
import { GameScreenLayout } from './GameScreenLayout';
import { portfolioImages } from '../data/portfolioData';
const SECTOR_CONFIG = {
    about: {
        menuId: 'about',
        scriptSubtitle: 'Dossier',
        missionCode: 'MISSION 02 // DOSSIER',
        missionObjective: 'DECRYPT PLAYER DOSSIER & BACKGROUND',
        backgroundImage: portfolioImages.about,
    },
    skills: {
        menuId: 'skills',
        scriptSubtitle: 'Arsenal',
        missionCode: 'MISSION 03 // ARSENAL',
        missionObjective: 'INSPECT UNLOCKED DEVELOPMENT ARSENAL',
        backgroundImage: portfolioImages.skills,
    },
    projects: {
        menuId: 'projects',
        scriptSubtitle: 'Operations',
        missionCode: 'MISSION 04 // OPERATIONS',
        missionObjective: 'ANALYZE DEPLOYED PRODUCTION OPERATIONS',
        backgroundImage: portfolioImages.projects,
    },
    experience: {
        menuId: 'experience',
        scriptSubtitle: 'Timeline',
        missionCode: 'MISSION 05 // CAREER TIMELINE',
        missionObjective: 'TRACE INDUSTRY CAREER MILESTONES',
        backgroundImage: portfolioImages.experience,
    },
    achievements: {
        menuId: 'achievements',
        scriptSubtitle: 'Trophies',
        missionCode: 'MISSION 06 // TROPHIES',
        missionObjective: 'INSPECT CLAIMED MILESTONES & HONORS',
        backgroundImage: portfolioImages.hero,
    },
    education: {
        menuId: 'academy',
        scriptSubtitle: 'Academy',
        missionCode: 'MISSION 07 // ACADEMY',
        missionObjective: 'VERIFY ACADEMIC & TECHNICAL CREDENTIALS',
        backgroundImage: portfolioImages.about,
    },
    services: {
        menuId: 'services',
        scriptSubtitle: 'Contracts',
        missionCode: 'MISSION 08 // CONTRACTS',
        missionObjective: 'COMMISSION CUSTOM DIGITAL BUILDS',
        backgroundImage: portfolioImages.skills,
    },
    contact: {
        menuId: 'contact',
        scriptSubtitle: 'Comm-Link',
        missionCode: 'MISSION 09 // COMM-LINK',
        missionObjective: 'ESTABLISH SECURE ENCRYPTED TRANSMISSION',
        backgroundImage: portfolioImages.contact,
    },
};
export const SectorPageLayout = ({ sectorId, children }) => {
    const config = SECTOR_CONFIG[sectorId] || {
        menuId: sectorId,
        scriptSubtitle: 'Dossier',
        missionCode: `MISSION // ${sectorId.toUpperCase()}`,
        missionObjective: 'EXPLORE DEVELOPMENT PROFILE & SPECS',
        backgroundImage: portfolioImages.hero,
    };
    return (<GameScreenLayout activeMenuId={config.menuId} scriptSubtitle={config.scriptSubtitle} missionCode={config.missionCode} missionObjective={config.missionObjective} backgroundImage={config.backgroundImage}>
      {children}
    </GameScreenLayout>);
};
