/**
 * Api
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { SiteCategory } from './siteCategory';
import { SiteMedia } from './siteMedia';
import { SitePost } from './sitePost';
import { User } from './user';

export interface SiteSetting { 
    id?: number;
    subDomain?: string;
    domain?: string;
    title?: string;
    description?: string;
    keywords?: string;
    thumbSocial?: string;
    logo?: string;
    themeNumber?: number;
    colorTheme?: string;
    createdAt?: Date;
    updatedAt?: Date;
    requestDomain?: string;
    requestDomainAt?: Date;
    disableDomain?: number;
    acceptDomainAt?: Date;
    tenantId?: number;
    tenant?: User;
    siteCategories?: Array<SiteCategory>;
    siteMedia?: Array<SiteMedia>;
    sitePosts?: Array<SitePost>;
    users?: Array<User>;
}