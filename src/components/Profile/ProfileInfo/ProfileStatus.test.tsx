import React from "react";
import {act, create} from 'react-test-renderer';
import ProfileStatus from "./ProfileStatus";

describe('Profile status component',() => {
    // const component = create(<ProfileStatus status={'new status'}/> );
    let component;
    act(() => {
        component = create(<ProfileStatus status={'new status'}/>)
    });
    // @ts-ignore
    const instance = component.root;
    // const instance = component.getInstance();
    expect(instance.status).toBe('new status')
} )