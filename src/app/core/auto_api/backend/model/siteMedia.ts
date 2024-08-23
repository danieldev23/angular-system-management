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
import { SiteSetting } from './siteSetting';
import { User } from './user';

export interface SiteMedia { 
    id?: number;
    siteCategoryId?: number;
    fileName?: string;
    fileSize?: number;
    fileUrl?: string;
    mimeType?: string;
    tenantId?: number;
    siteId?: number;
    createdAt?: Date;
    updatedAt?: Date;
    site?: SiteSetting;
    siteCategory?: SiteCategory;
    tenant?: User;
}