import { Word } from '../Word';
import './Topbar.css';

export const Topbar = () => {
    return (
        <header className="topbar">
            <Word word="слово" />

            <button className="rules-button" onClick={() => console.log('kek')}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path fill="currentColor" d="M320 640c-176.731 0-320-143.269-320-320s143.269-320 320-320v0c176.731 0 320 143.269 320 320s-143.269 320-320 320v0zM384 224c0 8.96-6.72 25.6-13.44 32l-50.56 50.56c-18.24 18.56-32 51.2-32 77.44v32h64v-32c0-9.28 6.72-25.6 13.44-32l50.56-50.56c18.24-18.56 32-51.2 32-77.44 0-70.692-57.308-128-128-128s-128 57.308-128 128v0h64c0-35.346 28.654-64 64-64s64 28.654 64 64v0zM288 480v64h64v-64h-64z" />
                </svg>
            </button>
        </header>
    );
}
