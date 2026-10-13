import { mockPortraitUrl as portraitFromAssets, PlaygroundPersona } from "@bari77/gc-playground";
import { environment } from "../../environments/environment";
import { mockUuid } from "./ids";

/** Same catalog as Platform: `…/Avatars/{1-12}.png`, stable per seed so faces do not flicker. */
export function mockPortraitUrl(seed: string): string {
    return portraitFromAssets(environment.assetsBaseUrl ?? "", seed);
}

export interface MockPersona extends PlaygroundPersona {}

/**
 * Minimal synthetic cast for `gc-create-game` clones.
 * Replace with game-specific summons / adventurers when scaffolding a real front.
 */
export const MOCK_PERSONAS: MockPersona[] = [
    {
        id: "Astra",
        platformUserPublicId: mockUuid("template:platform:Astra"),
        playerPublicId: mockUuid("template:player:Astra"),
        nickname: "Astra",
        discriminator: "0001",
    },
    {
        id: "Bolt",
        platformUserPublicId: mockUuid("template:platform:Bolt"),
        playerPublicId: mockUuid("template:player:Bolt"),
        nickname: "Bolt",
        discriminator: "0002",
    },
    {
        id: "Cipher",
        platformUserPublicId: mockUuid("template:platform:Cipher"),
        playerPublicId: mockUuid("template:player:Cipher"),
        nickname: "Cipher",
        discriminator: "0003",
    },
];

export const DEFAULT_PERSONA_ID = "Astra";

export function persona(nickname: string): MockPersona {
    const found = MOCK_PERSONAS.find((item) => item.id === nickname || item.nickname === nickname);
    if (!found) {
        throw new Error(`Unknown mock persona: ${nickname}`);
    }
    return found;
}

export function personaByPlatformId(publicId: string): MockPersona | undefined {
    return MOCK_PERSONAS.find((item) => item.platformUserPublicId === publicId);
}

export function personaByPlayerId(publicId: string): MockPersona | undefined {
    return MOCK_PERSONAS.find((item) => item.playerPublicId === publicId);
}
