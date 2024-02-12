import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
//import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'FirstSolutionWebPartStrings';
import FirstSolution from './components/FirstSolution';
import { IFirstSolutionProps } from './components/IFirstSolutionProps';
import {sp} from '@pnp/sp/presets/all';

export interface IFirstSolutionWebPartProps {
  description: string;
}

export default class FirstSolutionWebPart extends BaseClientSideWebPart<IFirstSolutionWebPartProps> {



  public async render(): Promise<void> {
    const element: React.ReactElement<IFirstSolutionProps> = React.createElement(
      FirstSolution,
      {
        description: this.properties.description,
        context:this.context,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        // singleValueOptions:
        singleValueOptions:await this.getChoiceFields(this.context.pageContext.web.absoluteUrl,'Man'),
        singleOptions: await this.getChoice(this.context.pageContext.web.absoluteUrl,'Title')
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit().then(message => {
      sp.setup({
       spfxContext:this.context as any
      })
   });
  }

  // get choice fields

  private async getChoiceFields(siteurl:string,field:string):Promise<any>{
    try{
      const reponse=await fetch(`${siteurl}/_api/web/lists/GetByTitle('Department')/fields?$filter=EntityPropertyName eq '${field}'`,{
        method:'GET',
        headers:{
          'Accept':'application/json;odata=nometadata'
        }
      });
      const data=await reponse.json();
      const choices=data?.value[0]?.Choices||[];
      return choices.map((choice:any)=>({
        key:choice,
        text:choice
      }));
    }
    catch(error){
      console.error('Error while fetching chocie',error);
      throw error;
    }
  }


  //get choicesss imp look upp

  private async getChoice(siteurl:string,field:string):Promise<any>{
    try{
      const reponse=await fetch(`${siteurl}/_api/web/lists/GetByTitle('Department')/items?$select=ID,Title`,{
        method:'GET',
        headers:{
          'Accept':'application/json;odata=nometadata'
        }
      });
      const data=await reponse.json();
      //const choices=data?.value[0]?.Choices||[];
      //const choices=data?.value[0]?.Choices||[];
      return data.value.map((choice:any)=>({
        key:choice.ID,
        text:choice.Title
      }));
    }
    catch(error){
      console.error('Error while fetching chocie',error);
      throw error;
    }
  }



  //end look upp



 

 

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
