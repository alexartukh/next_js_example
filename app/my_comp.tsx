'use client';

import { useState } from "react";
import { useEffect } from 'react';

interface MyComponentProps {
    onClick: (x: string) => void;
    name: string;
}

export default function MyComponent( { onClick, name }: MyComponentProps ) {

    console.log("My Component " + name + " - CREATED");
    // several states
    const [state, setState] = useState(1);
    const [serverData, setServerData] = useState('nothing');

    useEffect(() => {
        // use API from client component
        fetch('https://localhost:7185/servertime/')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setServerData(data.serverTime);
            });

    return () => {
        // Функция очистки (выполняется перед повторным запуском или размонтированием)
    };
    }, undefined);
    // С пустым массивом []: Выполняется один раз при монтировании (первом появлении) компонента.
    // С undefined: Выполняется при кажлм рендеринге.
    // а вообще там должен стоять массив зависимостей

    const handleClickLocal = () => {
        
        if (state == 1) {
            setState(2);
        } 
        else if (state == 2) {
            setState(3);   
        }
        else {
            setState(1);
        }

        console.log("My Component " + name + " clicked : state = " + state);
        onClick(name);
    }

    return (
        <button style={{ backgroundColor: state === 1 ? 'lightblue' : state === 2 ? 'lightgreen' : 'lightcoral' }} onClick={handleClickLocal}>
            My Component ( { serverData } )
        </button>
    )
}