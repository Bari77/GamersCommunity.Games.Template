import { TemplateOrgMember } from "./orgs";

export interface TemplateOrgSheet {
    publicId: string;
    entitled: string;
    discriminator: string;
    sentence: string;
    members: TemplateOrgMember[];
}
