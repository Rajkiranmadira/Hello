import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IFirstSolutionProps {
  description: string;
  context:WebPartContext;
  siteUrl:string;
  singleValueOptions:any;
  singleOptions:any;
}
