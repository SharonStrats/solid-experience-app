import React, { useRef, useImperativeHandle } from 'react';
import classes from './Input.module.css';

// if you want to do something as a result of the input you can create a Reference
// you can now pass ref property to Input ref=''
// then you can call using yourRefVariable.current.focus which calls activate

// eslint-disable-next-line react/display-name
const Input = React.forwardRef((props: any, ref: any) => {
    const inputRef = useRef();

    const activate = () => {
        // @ts-ignore
        inputRef.current.focus();
    }

    // translation...
    useImperativeHandle(ref, () => {
        return {
            focus: activate
        };
    });

  return (
      <div className={`${classes.control} ${props.isValid === false ? classes.invalid : ''}`}>
          <label htmlFor={props.id}>{props.label}</label>
          <input
              ref={inputRef as any}
              type={props.type}
              id={props.id}
              value={props.value}
              onChange={props.onChange}
              onBlur={props.onBlur}
              />
      </div>
  )
});

export default Input;