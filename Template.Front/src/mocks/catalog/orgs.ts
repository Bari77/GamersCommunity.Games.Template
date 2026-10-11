import { mockUuid } from "./ids";
import { persona } from "./personas";

export const ORG_PUBLIC_ID = mockUuid("template:org:Demo Company");

export interface TemplateOrgMember {
    playerPublicId: string;
    platformUserPublicId: string;
    nickname: string;
    discriminator: string;
    rank: string;
}

export interface TemplateOrgSheet {
    publicId: string;
    entitled: string;
    discriminator: string;
    sentence: string;
    members: TemplateOrgMember[];
}

function member(nickname: string, rank: string): TemplateOrgMember {
    const who = persona(nickname);
    return {
        playerPublicId: who.playerPublicId,
        platformUserPublicId: who.platformUserPublicId,
        nickname: who.nickname,
        discriminator: who.discriminator,
        rank,
    };
}

/** Single demo org so clones inherit the catalog pattern (rename to teams/guilds per game). */
export const mockOrgSheet: TemplateOrgSheet = {
    publicId: ORG_PUBLIC_ID,
    entitled: "Demo Company",
    discriminator: "0001",
    sentence: "Scaffold org for gc-create-game — replace with teams or guilds.",
    members: [member("Astra", "captain"), member("Bolt", "member"), member("Cipher", "member")],
};
