import * as React from 'react';
//import styles from './FirstSolution.module.scss';
import { IFirstSolutionProps } from './IFirstSolutionProps';
import { DefaultButton, Label, TextField } from 'office-ui-fabric-react';

import {Web} from '@pnp/sp/presets/all';

import {PeoplePicker,PrincipalType}  from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { IFirstSolutionState } from './IFirstSolutionState';
import { sp } from '@pnp/sp';
import { Dropdown } from 'office-ui-fabric-react';
// import { sp } from '@pnp/sp';

// import { IAttachmentInfo } from "@pnp/sp/attachments";
// import { IItem } from "@pnp/sp/items/types";
//import { ListItemAttachments } from '@pnp/spfx-controls-react/lib/ListItemAttachments';


 
  


export default class FirstSolution extends React.Component<IFirstSolutionProps, IFirstSolutionState> {

  constructor(props:any){
    super(props);
    this.state={
      Employee:"",
      EmployeeId:0,
      numone:"",
      numtwo:"",
      numSum:"",
      sample:"",
      userss: [],
      fileone:[],
      filetwo:[],
      singleValueDropdown:"",
      singleOptions:""
    }
    this._getPeoplePickerItems=this._getPeoplePickerItems.bind(this);
    
    this.onsubmit=this.onsubmit.bind(this);
    this.yoo= this.yoo.bind(this);
    this.blob=this.blob.bind(this);
    this.uploadListAttachments=this.uploadListAttachments.bind(this);

    
  }

  componentDidMount() {
    console.log("component did mount");

  }

  componentDidUpdate(prevProps: Readonly<IFirstSolutionProps>, prevState: Readonly<IFirstSolutionState>, snapshot?: any): void {
    console.log("Component did update")
  }


  //test
  public uploadListAttachments = async () =>{

    let item =  sp.web.lists.getByTitle("SPfxlist").items.getById(1);  
        item.attachmentFiles.addMultiple(this.state.fileone).then(v => {  
            console.log(v);  
        }).catch(function(err) {  
            alert(err);  
        }); 

  }

 

  public blob=async() =>{  

    var fileInfos:any = []; 
    let input:any = document.getElementById("exampleFormControlFile1");  
    let fileCount = input.files.length;  
    console.log(fileCount);  
    for (var i = 0; i < fileCount; i++) {  
        var fileName = input.files[i].name;  
        console.log(fileName);  
        var file = input.files[i];  
        var reader = new FileReader();  
        reader.onload = await ((file)=> {  
            return (e:any)=> {  
                console.log(file.name);  
                fileInfos.push({  
                    "name": file.name,  
                    "content": e.target.result  
                });  
                console.log(fileInfos);  
                this.setState({fileone:fileInfos})
            }  
        })(file);  

        reader.readAsArrayBuffer(file);  

        let item =  sp.web.lists.getByTitle("SPfxlist").items.getById(1);  
        item.attachmentFiles.addMultiple(fileInfos).then(v => {  
            console.log(v);  
        }).catch(function(err) {  
            alert(err);  
        }); 

        

        



    }  

    

    //End of for loop  

}  



//blob two

public blobone=async() =>{  

  var fileInfoss:any = []; 
  let raj:any = this.state.fileone;
  console.log(raj);
  let input:any = document.getElementById("exampleFormControlFile2");  
  let fileCount = input.files.length;  
  console.log(fileCount);  
  for (var i = 0; i < fileCount; i++) {  
      var fileName = input.files[i].name;  
      console.log(fileName);  
      var file = input.files[i];  
      var reader = new FileReader();  
      reader.onload = await ((file)=> {  
          return (e:any)=> {  
              console.log(file.name);  
              fileInfoss.push({  
                  "name": file.name,  
                  "content": e.target.result  
              });  
              console.log(fileInfoss);  
              this.setState({filetwo:fileInfoss})
          }  
      })(file);  

      reader.readAsArrayBuffer(file);  

      // let item =  sp.web.lists.getByTitle("SPfxlist").items.getById(1);  
      // item.attachmentFiles.addMultiple(this.state.fileone).then(v => {  
      //     console.log(v);  
      // }).catch(function(err) {  
      //     alert(err);  
      // }); 



  }  

  

  //End of for loop  

}  


//blob two

  
//real
  public  yoo =async()=>{
    console.log("Button clicked");

    console.log(this.state.filetwo);
    console.log(this.state.fileone)


    const web = Web(this.props.siteUrl);
    await web.lists.getByTitle('SPfxlist').items.add({
      Title:"OmNamahShivaya",
      EmployeeId:this.state.EmployeeId,
      ProjectMembersId: { results: this.state.userss } ,
      
    }).then((data) =>{
      console.log("No errors"+data)
      console.log("item id is:", data.data.Id);

      //test
      let item =  sp.web.lists.getByTitle("SPfxlist").items.getById(data.data.Id);  
         item.attachmentFiles.addMultiple(this.state.fileone).then((v) => {  
            console.log(v);
            //start 
            item.attachmentFiles.addMultiple(this.state.filetwo).then(v => {  
              console.log(v);  
          }) 
          //end
        }).catch(function(err) {  
            alert(err);  
        }); 

        

      //test


    })
    .catch((err) =>{
      console.log(err);
    }

    )
  }

  //handle change

  // public handlechange = (e:any)  =>{
  //   this.setState({numtwo:e.target.value}, () => 
  //   console.log(this.state.numtwo));
  //   this.setState({numSum:""},
  //    ()=> { this.setState({numSum: (Number(this.state.numone)+Number(this.state.numtwo)).toString()})}
  //    )
  //   this.setState({sample:"hi"})
  // }


 

//common

public commonHandler = (fieldName: keyof IFirstSolutionState, value:string | number | boolean):void =>{



  this.setState({[fieldName]:value} as unknown as Pick<IFirstSolutionState,keyof IFirstSolutionState> );

  this.setState({numSum:""},
     ()=> { this.setState({numSum: (Number(this.state.numone)+Number(this.state.numtwo)).toString()})}
     )

}



  public onsubmit = async (one:any,two:any) => {

    console.log(Number(this.state.numone)+"rey one")
    console.log(Number(this.state.numSum)+"rey two")

    await this.setState({numSum: (one + two).toString()}, () => 
    alert(this.state.numSum));
    
  }




//single user select people picker
  private _getPeoplePickerItems(items: any[]) {

    if(items.length>0){
      this.setState({
        Employee:items[0].text,
        EmployeeId:items[0].id
      })

    }
    console.log('Items:', items);
  }


  //multiple users select people picker

  public multiplePeoplePikcer(items: any[]){

    let userarr:any = [];
    items.forEach(user => {
      userarr.push({ ID: user.id});
    });
    console.log(userarr);
    

    this.setState({ userss: [...this.state.userss, userarr] });

    
  }



  public render(): React.ReactElement<IFirstSolutionProps> {
    

    return (
      <div>
        <h1>Om Namah Shivaya</h1>

        <div>
          <Label>Employee Name</Label>

        <PeoplePicker
        context={this.props.context as any}
        titleText="People Picker"
        personSelectionLimit={1}
        groupName={""} // Leave this blank in case you want to filter from all users
        showtooltip={true}
        required={false}
        disabled={false}
        searchTextLimit={5}
        ensureUser={true}
        defaultSelectedUsers={[this.state.Employee?this.state.Employee:""]}
        
        onChange={this._getPeoplePickerItems}
        showHiddenInUI={false}
        principalTypes={[PrincipalType.User]}
        resolveDelay={1000}
        />
        </div>
        {/* multiple people picker */}
        <div>
        <PeoplePicker
        context={this.props.context as any}
        titleText="People Picker"
        personSelectionLimit={3}
        groupName={""} // Leave this blank in case you want to filter from all users
        showtooltip={true}
        required={false}
        disabled={false}
        searchTextLimit={5}
        ensureUser={true}
        // defaultSelectedUsers={this.state.users}
        
        onChange={this.multiplePeoplePikcer}
        showHiddenInUI={false}
        principalTypes={[PrincipalType.User]}
        resolveDelay={1000}
        />

        </div>

        <TextField name="numone" label='num1' type='number' onChange={(e,value) =>this.commonHandler("numone",value || "")} />

        <TextField name="numtwo" type='number' onChange={(e,value)=>this.commonHandler("numtwo",value || "")} />

        <TextField type='number' value={this.state.numSum} />

        {/* <ListItemAttachments listId='dfa283f4-5faf-4d54-b6b8-5bcaf2725af5'
                     itemId={1}
                     context={this.props.context as any}
                     disabled={false} /> */}
        <div className='showorhide' id="show" style={{display:this.state.numone== "100" ? 'block' : 'none'}}>
         <TextField label='show or hide' type='number' />       
        </div>


        {/* Dropdown */}
        <div>
          <Dropdown placeholder='Single select dropdown'
            options={this.props.singleValueOptions}
            selectedKey={this.state.singleValueDropdown}
            label="Single Selected Dropdown"
            
          />
        </div>

        <div>
          <Dropdown placeholder='Single select dropdown'
            options={this.props.singleOptions}
            selectedKey={this.state.singleOptions}
            label="Single Selected Dropdown"
            
          />
        </div>



        <div id="fileUploader">  
    <input type="file" id="exampleFormControlFile1" name="myfiles" onChange={()=>this.blob()}/>  
    <DefaultButton onClick= {()=>this.blob()}>Upload</DefaultButton>  
</div> 
<input type="file" id="exampleFormControlFile2" name="myfiless" onChange={()=>this.blobone()}/>  


<DefaultButton onClick= {()=>this.uploadListAttachments()}>Upload</DefaultButton>


      

        <button onClick={()=>this.yoo()}>Yoo</button>
        <DefaultButton onClick={()=>this.onsubmit(Number(this.state.numone), Number(this.state.numtwo))}>onsubmit</DefaultButton>

      </div>
    );
  }
}
