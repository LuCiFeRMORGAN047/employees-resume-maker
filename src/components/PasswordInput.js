import React from "react";
import { Input, Spacer } from "@nextui-org/react";
export default function PasswordInput(props) {
    
      
    
    
    return (
    <><Spacer y={1.6}/>
        <Input.Password   className="form-control" labelPlaceholder="Password" size="md" onChange={props.onChange} /></>
        

      
    );
  }