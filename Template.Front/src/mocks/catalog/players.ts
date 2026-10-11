import { MOCK_PERSONAS, mockPortraitUrl } from "./personas";
import { getSessionPersona } from "./session";

export interface TemplatePlayerSheet {
    publicId: string;
    platformUserPublicId: string;
    nickname: string;
    discriminator: string;
    avatarUrl: string;
    presentation: string;
}

const self = getSessionPersona();

export const PLATFORM_USER_PUBLIC_ID = self.platformUserPublicId;
export const PLAYER_PUBLIC_ID = self.playerPublicId;

export const mockPlayerSheets: TemplatePlayerSheet[] = MOCK_PERSONAS.map((who) => ({
    publicId: who.playerPublicId,
    platformUserPublicId: who.platformUserPublicId,
    nickname: who.nickname,
    discriminator: who.discriminator,
    avatarUrl: mockPortraitUrl(who.nickname),
    presentation: `${who.nickname} is a demo persona from the template catalog.`,
}));

export const mockPlayerSheet: TemplatePlayerSheet =
    mockPlayerSheets.find((sheet) => sheet.publicId === PLAYER_PUBLIC_ID) ?? mockPlayerSheets[0];
